const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product.controller");
//@@ GET ALL PRODUCTS

router.get("/", productCtl.getAllProducts);
router.get("/search", productCtl.searchProducts);
module.exports = router;
