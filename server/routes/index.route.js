const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

//@@AUTH
router.use("/auth", require("./auth.route"));

//@@PRODUCT
router.use("/products", require("./product.route"));

//@@REVIEW
router.use("/reviews", require("./review.route"));

//@@CART
router.use("/cart", require("./cart.route"));
//@@BILL
router.use("/bill", require("./bill.route"));
//@@ADMIN
router.use("/admin", require("./admin.route"));

//@@ROUTE
router.use("/exercise", require("./exercise.route"));

//@@POST
router.use("/post", require("./post.route"));

//@@USER
router.use("/user", require("./user.route"));

//@@CHECKOUT
router.use("/checkout", require("./checkout.route"));
module.exports = router;
