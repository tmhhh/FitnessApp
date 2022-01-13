const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
const billController = require("../controllers/bill.controller");

router.get("/abc", billController.updateAll);
router.get(
  "/totalNumb",
  verifyToken,
  verifyAdmin,
  billController.getTotalBillNumb
);
router.get("/", verifyToken, verifyAdmin, billController.getBills);
router.get(
  "/by-status",
  verifyToken,
  verifyAdmin,
  billController.getBillsByStatus
);

router.put(
  "/status",
  verifyToken,
  verifyAdmin,
  billController.updateBillStatus
);
router.get(
  "/revenue-by-year",
  verifyToken,
  verifyAdmin,
  billController.getTotalRevenueByYear
);

router.get("/history", verifyToken, billController.getBillHistoryByCustomer);
router.get("/incomplete", verifyToken, billController.getIncompleteBill);
module.exports = router;
