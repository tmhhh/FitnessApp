const express = require("express");
const router = express.Router();

//@@AUTH
router.use("/auth", require("./auth.route"));

//@@PRODUCT
router.use("/products", require("./product.route"));

//@@CART
router.use("/cart", require("./cart.route"));

module.exports = router;
