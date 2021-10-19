const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyToken.mdw");
const billController = require("../controllers/bill.controller");
const paypalUtil = require("../utils/paypalSDK");
router.post("/", verifyUser, billController.billCheckOut);
router.post("/paypal", verifyUser, paypalUtil.handleRequest);
router.get("/paypal/success", paypalUtil.captureOrder);
router.get("/paypal/cancel", (req, res) => {
  res.send("cancel");
});
module.exports = router;
