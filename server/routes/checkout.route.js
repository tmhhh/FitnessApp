const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyToken.mdw");
const billController = require("../controllers/bill.controller");
const paypalUtil = require("../utils/paypalSDK");
const vnpayCheckout = require("../utils/vnpayCheckout");
router.post("/", verifyUser, billController.billCheckOut);
router.post("/paypal", verifyUser, paypalUtil.handleRequest);
router.get("/paypal/capture", paypalUtil.captureOrder);
router.get("/paypal/cancel", (req, res) => {
  res.send("cancel");
});

//VNPAY
router.post("/vnpay", verifyUser, vnpayCheckout.createPaymentURL);
router.get("/vnpay_ipn", vnpayCheckout.IPN);
router.get("/vnpay_return", vnpayCheckout.handleCallback);

module.exports = router;
