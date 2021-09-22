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

//@@TEST
// router.get("/session", (req, res) => {
//   req.session.count = 0;
//   //   res.json("hi");
// });
// router.get("/session2", (req, res) => {
//   console.log(req.session.count);
//   req.session.count += 1;
//   res.json(req.session.count);
// });
router.get("/private", (req, res) => res.json(req.user));
//@@ADMIN
router.use("/admin", require("./admin.route"));

//@@POST
router.use("/post", require("./post.route"));

module.exports = router;
