const express = require("express");
const router = express.Router();
const voucherCtl = require("../controllers/voucher.controller");
const verifyUser = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/add", verifyUser, verifyAdmin, voucherCtl.addingVou);
router.get("/verifyVoucher", verifyUser, voucherCtl.verifyVoucher);
// , verifyUser, verifyAdmin,
module.exports = router;
