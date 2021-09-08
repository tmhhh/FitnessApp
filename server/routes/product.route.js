const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product.controller");
const upload = require("../middlewares/uploadFile.mdw");

//@@ GET ALL PRODUCTS
router.get("/", productCtl.getAllProducts);
router.post(
  "/",
  upload("products").fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imagesFile", maxCount: 6 },
  ]),
  productCtl.create
);
router.put(
  "/:id",
  upload("products").fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imagesFile", maxCount: 6 },
  ]),
  productCtl.update
);
router.delete("/:id", productCtl.delete);

module.exports = router;
