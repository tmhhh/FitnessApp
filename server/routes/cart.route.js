const express = require("express");
const router = express.Router();
const cartCtl = require("../controllers/cart.controller");
router.route("/add").get(cartCtl.addingToCart);
module.exports = router;
