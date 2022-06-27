const querystring = require("qs");
const crypto = require("crypto");
var dateFormat = require("dateformat");

const { calTotalPrice, calSubTotal } = require("../utils/cartUtils");
const vouModel = require("../models/voucher.model");
const nodemailer = require("../utils//nodemailer");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");

const billModel = require("../models/bill.model");

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = {
  createPaymentURL: async (req, res) => {
    try {
      const { foundVou, foundUser } = req;
      const { listItems, shippingFee, discountUsedID } = req.body;
      // const foundVou = await vouModel.findById(discountUsedID);

      var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      var tmnCode = process.env.vnp_TmnCode;
      var secretKey = process.env.vnp_HashSecret;
      var vnpUrl = process.env.vnp_Url;
      var returnUrl = process.env.vnp_ReturnUrl;

      var date = new Date();
      const totalPrice =
        calTotalPrice(
          listItems,
          foundVou ? foundVou.vouDiscount : 0,
          shippingFee
        ) * 23000;
      // console.log(Math.trunc(totalPrice));
      var createDate = dateFormat(date, "yyyymmddHHmmss");
      var orderId = dateFormat(date, "HHmmss");
      var amount = Math.trunc(totalPrice).toString();
      var bankCode = "";

      var orderInfo = "Thanh toan don hang thoi gian: 2021-11-27 01:11:05";
      var orderType = "topup";
      var locale = "vn";
      if (locale === null || locale === "") {
        locale = "vn";
      }
      var currCode = "VND";
      var vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = orderInfo;
      vnp_Params["vnp_OrderType"] = orderType;
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      var querystring = require("qs");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      // //ADD INAPPROVED BILL TO DB
      let items = foundUser.userCart
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
          id: orderId,
        },
        listItems: items,
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

      res.status(200).json({ isSuccess: true, approveUrl: vnpUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ isSuccess: false });
    }
  },
  IPN: async (req, res) => {
    try {
      var vnp_Params = req.query;
      var secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);
      var secretKey = process.env.vnp_HashSecret;
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");

      if (secureHash === signed) {
        var orderId = vnp_Params["vnp_TxnRef"];
        var rspCode = vnp_Params["vnp_ResponseCode"];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: "00", Message: "success" });
      } else {
        res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },
  handleCallback: async (req, res) => {
    try {
      var vnp_Params = req.query;

      const id = vnp_Params.vnp_TxnRef;
      var secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);

      var tmnCode = process.env.vnp_TmnCode;
      var secretKey = process.env.vnp_HashSecret;

      var signData = querystring.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");

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
