const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
const billController = require("../controllers/bill.controller");
// router.get("/total")
router.get(
  "/revenue-by-year",
  verifyToken,
  verifyAdmin,
  billController.getTotalRevenueByYear
);

router.get("/history", verifyToken, billController.getBillByCustomer);

module.exports = router;
