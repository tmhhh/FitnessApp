const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyToken.mdw");
const cartCtl = require("../controllers/cart.controller");

router.route("/add").put(verifyUser, cartCtl.addingToCart);
module.exports = router;
