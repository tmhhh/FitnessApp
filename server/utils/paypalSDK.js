const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const userModel = require("../models/user.model");
const vouModel = require("../models/voucher.model");
const productModel = require("../models/product.model");
const { calSubTotal, calTotalPrice } = require("../utils/cartUtils");
const nodemailer = require("../utils//nodemailer");

const billModel = require("../models/bill.model");
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

function environment() {
  let clientId =
    process.env.PAYPAL_SANDBOX_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  let clientSecret =
    process.env.PAYPAL_SANDBOX_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

module.exports = {
  cancelOrder: async (req, res) => {
    try {
      const id = req.query.token;
      const deletedBill = await billModel.findOneAndDelete({
        "payment.id": id,
      });
      res.redirect(process.env.client_URL + "/checkout/fail");
    } catch (error) {
      console.log(error);
    }
  },
  handleRequest: async function handleRequest(req, res) {
    const { shippingFee, discountUsedID, listItems } = req.body;
    const { foundVou, foundUser } = req;
    try {
      // 1st WAY => GET CART FROM DB
      // const foundUser = userModel
      //   .findById(req.userID)
      //   .populate("userCart.product");listRes
      // const foundVou = pro.findById(discountUsedID);
      // const listRes = await Promise.all([foundUser, foundVou]);

      //CART TOTAL PRICE
      const cartTotalPrice = calSubTotal(foundUser.userCart);
      console.log({ cartTotalPrice });
      //CREATE ORDER
      const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        application_context: {
          return_url: process.env.server_URL + "/checkout/paypal/capture",
          cancel_url: process.env.server_URL + "/checkout/paypal/cancel",
        },
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (
                cartTotalPrice *
                  (1 - (foundVou ? foundVou.vouDiscount / 100 : 0)) +
                shippingFee
              ).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartTotalPrice.toFixed(2),
                },
                shipping: {
                  currency_code: "USD",
                  value: shippingFee.toString(),
                },
                discount: {
                  currency_code: "USD",
                  value: foundVou
                    ? ((cartTotalPrice * foundVou.vouDiscount) / 100).toString()
                    : "0",
                },
              },
            },
            items: foundUser.userCart
              .filter((e) => {
                if (e.isSelected && !e.isOrdered) return true;
              })
              .map((ele) => ({
                name: ele.product.prodName,
                description: "Supplements",
                sku: ele.product._id,
                unit_amount: {
                  currency_code: "USD",
                  value:
                    ele.product.prodPrice *
                    (new Date(ele.product.prodDiscount?.startDate).getTime() -
                      new Date().getTime() <
                    0
                      ? 1 -
                        (ele.product.prodDiscount?.discountPercent || 0) / 100
                      : 1
                    ).toFixed(2),
                },
                quantity: ele.quantity.toString(),
                category: "PHYSICAL_GOODS",
              })),
          },
        ],
      });

      let order;
      order = await client().execute(request);
      // console.log(order);
      const approveUrl = order.result.links.find(
        (e) => e.rel === "approve"
      ).href;

      //ADD INAPPROVED BILL TO DB
      let listItems = foundUser.userCart
        .filter((e) => {
          if (e.isSelected && !e.isOrdered) return true;
        })
        .map((ele) => ({
          ...ele,
          prodDiscount: ele.product.prodDiscount.discountPercent,
          isApproved: false,
        }));
      const inApprovedBill = {
        ...req.body,
        payment: {
          method: req.body.payment.method,
          id: order.result.id,
        },
        listItems,
        user: req.userID,
        shippingAddress: {
          province: req.body.province,
          district: req.body.district,
          ward: req.body.ward,
        },
        price: {
          totalPrice: calTotalPrice(
            foundUser.userCart,
            foundVou ? foundVou.vouDiscount : 0,
            shippingFee
          ),
          subTotal: calSubTotal(foundUser.userCart),
          shippingFee,
          discount: foundVou ? foundVou.vouDiscount : 0,
        },
        discountUsed: discountUsedID,
      };
      await billModel.create(inApprovedBill);
      // console.log(order.result.id);
      // console.log(order.result.links);
      return res.status(200).json({ isSuccess: true, approveUrl });
    } catch (err) {
      // 4. Handle any errors from the call
      console.error(err);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  captureOrder: async (req, res) => {
    const id = req.query.token;
    request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(id);
    request.requestBody({
      intent: "CAPTURE",
    });
    try {
      let executeRequest = await client().execute(request);

      let approvingBill = await billModel
        .findOneAndUpdate(
          { "payment.id": id },
          { "payment.isApproved": true },
          { new: true }
        )
        .populate({
          path: "user",
          populate: {
            path: "userCart.product",
          },
        })
        .populate("listItems.product");

      // //UPDATE BOUGHT PRODUCT QUANTITY
      const listUpdateProds = [];
      for (const item of approvingBill.listItems) {
        listUpdateProds.push(
          productModel.findByIdAndUpdate(
            item.product._id,
            {
              $inc: { prodQuantity: -item.quantity },
            },
            { new: true }
          )
        );
      }

      //SEND MAIL CONFIRM ORDER TO BUYER
      nodemailer.billConfirm(
        approvingBill.user.userEmail,
        approvingBill,
        approvingBill._id
      );

      //UPDATE USER CART (ordered item: isOrdered => true)
      for (const item of approvingBill.listItems) {
        for (const prod of approvingBill.user.userCart) {
          if (prod.product._id.toString() === item.product._id.toString()) {
            prod.isOrdered = true;
            prod.isSelected = false;
          }
        }
      }
      await Promise.all([
        nodemailer.billConfirm(
          approvingBill.user.userEmail,
          approvingBill,
          approvingBill._id
        ),
        userModel.findByIdAndUpdate(approvingBill.user._id, {
          userCart: approvingBill.user.userCart,
        }),
        ...listUpdateProds,
      ]);

      res.redirect(process.env.client_URL + "/checkout/success");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },
};
