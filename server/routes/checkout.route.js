const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyToken.mdw");
const billController = require("../controllers/bill.controller");
const paypalUtil = require("../utils/paypalSDK");
const vnpayCheckout = require("../utils/vnpayCheckout");
const { verifyProdBeforeCheckout } = require("../controllers/bill.controller");
router.post("/", verifyUser, billController.billCheckOut);
router.post(
  "/paypal",
  verifyUser,
  verifyProdBeforeCheckout,
  paypalUtil.handleRequest
);
router.get("/paypal/capture", paypalUtil.captureOrder);
router.get("/paypal/cancel", paypalUtil.cancelOrder);

//VNPAY
router.post(
  "/vnpay",
  verifyUser,
  verifyProdBeforeCheckout,
  vnpayCheckout.createPaymentURL
);

router.get("/vnpay_ipn", vnpayCheckout.IPN);
router.get("/vnpay_return", vnpayCheckout.handleCallback);

module.exports = router;
