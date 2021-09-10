const express = require("express");
const router = express.Router();
const reviewCtl = require("../controllers/review.controller");

//@@ GET ALL PRODUCTS
router.get("/", reviewCtl.getByProductId);
router.post("/", reviewCtl.create);
router.put("/:id", reviewCtl.update);
router.delete("/:id", reviewCtl.delete);

module.exports = router;
