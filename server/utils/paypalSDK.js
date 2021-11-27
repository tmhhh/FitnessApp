const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const userModel = require("../models/user.model");
const vouModel = require("../models//voucher.model");
const calTotalPrice = require("../utils/cartUtils");
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
  handleRequest: async function handleRequest(req, res) {
    const { shippingFee, discountUsedID } = req.body;
    console.log({ discountUsedID });
    try {
      // 1st WAY => GET CART FROM DB
      const foundUser = userModel
        .findById(req.userID)
        .populate("userCart.product");
      const foundVou = vouModel.findById(discountUsedID);
      const listRes = await Promise.all([foundUser, foundVou]);

      //CART TOTAL PRICE
      const cartTotalPrice = listRes[0].userCart.reduce((sum, current) => {
        if (current.isSelected) {
          return (
            sum +
            current.quantity *
              current.product.prodPrice *
              (1 -
                parseFloat(current.product.prodDiscount?.discountPercent || 0) /
                  100)
          );
        }
        return sum;
      }, 0);

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
                  (1 - (listRes[1] ? listRes[1].vouDiscount / 100 : 0)) +
                shippingFee
              ).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartTotalPrice.toFixed(2).toString(),
                },
                shipping: {
                  currency_code: "USD",
                  value: shippingFee.toString(),
                },
                discount: {
                  currency_code: "USD",
                  value: listRes[1]
                    ? (
                        (cartTotalPrice * listRes[1].vouDiscount) /
                        100
                      ).toString()
                    : "0",
                },
              },
            },
            items: listRes[0].userCart
              .filter((e) => {
                if (e.isSelected) return true;
              })
              .map((e) => ({
                name: e.product.prodName,
                description: "Supplements",
                sku: e.product._id,
                unit_amount: {
                  currency_code: "USD",
                  value:
                    e.product.prodPrice *
                    (1 -
                      parseFloat(e.product.prodDiscount?.discountPercent || 0) /
                        100),
                },
                quantity: e.quantity.toString(),
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
      res.redirect(process.env.client_URL + "/checkout/success");
    } catch (error) {
      console.log(JSON.parse(error));
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },
};
