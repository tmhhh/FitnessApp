const express = require("express");
const router = express.Router();
const cateCtl = require("../controllers/cate.controller");
router.get("/", cateCtl.getAllCate);
router.post("/add", cateCtl.addingCate);
module.exports = router;
