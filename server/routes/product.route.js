const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product.controller");
const wishlistController = require("../controllers/wishlist.controller");
const upload = require("../middlewares/uploadFile.mdw");
const authMdw = require("../middlewares/verifyToken.mdw");

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

router.get("/search", productCtl.searchProducts);
// router.post("/search", productCtl.searchProducts);
// router.put("/search", productCtl.searchProducts);
// router.delete("/search", productCtl.searchProducts);

router
  .post(
    "wishlist/:id",
    authMdw,
    (req, res, next) => {
      req.type = "product";
      next();
    },
    wishlistController.add
  )
  .delete(
    "wishlist/:id",
    authMdw,
    (req, res, next) => {
      req.type = "product";
      next();
    },
    wishlistController.delete
  );
module.exports = router;
