const express = require("express");
const router = express.Router();

//@@CATE
router.use("/category", require("../routes/cate.route"));

//@@VOUCHER
router.use("/voucher", require("../routes/voucher.route"));

module.exports = router;
