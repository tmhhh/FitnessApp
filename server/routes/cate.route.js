const express = require("express");
const router = express.Router();
const cateCtl = require("../controllers/cate.controller");
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
router.get("/", cateCtl.getAllCate);
router.post("/add", verifyToken, verifyAdmin, cateCtl.addingCate);
router.put("/update", verifyToken, verifyAdmin, cateCtl.updatingCate);
router.delete(
  "/delete/:cateID",
  verifyToken,
  verifyAdmin,
  cateCtl.deletingCate
);
module.exports = router;
