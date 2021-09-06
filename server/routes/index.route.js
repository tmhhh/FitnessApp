const express = require("express");
const { route } = require("./auth.route");
const router = express.Router();

//@@AUTH
router.use("/auth", require("./auth.route"));

//@@PRODUCT
router.use("/products", require("./product.route"));
module.exports = router;
