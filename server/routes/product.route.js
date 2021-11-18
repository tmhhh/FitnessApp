const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product.controller");
const wishlistController = require("../controllers/wishlist.controller");
const upload = require("../middlewares/uploadFile.mdw");
const authMdw = require("../middlewares/verifyToken.mdw");

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

//DISCOUNT
router.put("/discount/add", verifyToken, verifyAdmin, productCtl.addDiscount);
router.put(
  "/discount/reset",
  verifyToken,
  verifyAdmin,
  productCtl.resetDiscount
);
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
