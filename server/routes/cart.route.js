const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyToken.mdw");
const cartCtl = require("../controllers/cart.controller");

router.route("/add").put(verifyUser, cartCtl.addingToCart);

//
router.delete("/delete", verifyUser, cartCtl.deletingFromCart);

//
router.put("/update", verifyUser, cartCtl.updatingCart);
router.put("/update/select", verifyUser, cartCtl.updatingProdSelect);
module.exports = router;
