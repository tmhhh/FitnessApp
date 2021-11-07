const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product.controller");
const upload = require("../middlewares/uploadFile.mdw");
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
//@@ GET ALL PRODUCTS
router.get("/", productCtl.getAllProducts);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload("products").fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imagesFile", maxCount: 6 },
  ]),
  productCtl.create
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload("products").fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imagesFile", maxCount: 6 },
  ]),
  productCtl.update
);
router.delete("/:id", verifyToken, verifyAdmin, productCtl.delete);

router.get("/search", verifyToken, verifyAdmin, productCtl.searchProducts);
router.get("/total", verifyToken, verifyAdmin, productCtl.getTotalNumbProds);
// router.post("/search", productCtl.searchProducts);
// router.put("/search", productCtl.searchProducts);
// router.delete("/search", productCtl.searchProducts);
module.exports = router;
