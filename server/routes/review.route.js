const express = require("express");
const router = express.Router();
const reviewCtl = require("../controllers/review.controller");
const authMdw = require("../middlewares/verifyToken.mdw");

//@@ GET ALL PRODUCTS
router.get("/", reviewCtl.getByProductId);
router.post("/", authMdw, reviewCtl.create);
router.put("/:id", authMdw, reviewCtl.update);
router.delete("/:id", authMdw, reviewCtl.delete);

router.post("/like/:id", authMdw, reviewCtl.like);

module.exports = router;
