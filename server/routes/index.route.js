const express = require("express");
const router = express.Router();

//@@AUTH
router.use("/auth", require("./auth.route"));

//@@PRODUCT
router.use("/products", require("./product.route"));

//@@REVIEW
router.use("/reviews", require("./review.route"));

//@@CART
router.use("/cart", require("./cart.route"));

//@@ADMIN
router.use("/admin", require("../Admin/router"));

//@@POST
router.use("/post", require("./post.route"));

module.exports = router;
