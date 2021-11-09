const productModel = require("../models/product.model");
const cateModel = require("../models/cate.model");
module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const listProducts = await productModel
        .find()
        .populate("prodCategory.cateName")
        .lean();
      for (const prod of listProducts) {
        for (const filter of prod.prodCategory.cateName.cateFilter) {
          if (
            filter._id.toString() ===
            prod.prodCategory.cateFilter._id.toString()
          ) {
            prod.prodCategory.cateFilter.filterName = filter.filterName;
          }
        }
      }

      //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
      for (const prod of listProducts) {
        delete prod.prodCategory.cateName.cateFilter;
      }
      return res.status(200).json({ isSuccess: true, listProducts });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    try {
      const product = new productModel({
        ...req.body,
        prodThumbnail:
          req.files.thumbnailFile?.length > 0
            ? req.files.thumbnailFile[0].filename
            : "default-product.png",
        prodImages: req.files.imagesFile?.map((img) => img.filename),
      });
      // console.log(product, req.files.imagesFile);
      await product.save();
      return res.status(200).json({ isSuccess: true, product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    const product = { ...req.body };
    if (req.files.thumbnailFile?.length > 0) {
      product["prodThumbnail"] = req.files.thumbnailFile[0].filename;
    }
    if (req.files.imagesFile?.length > 0) {
      product["prodImages"] = req.files.imagesFile.map(
        (image) => image.filename
      );
    }
    try {
      await productModel.updateOne({ _id: req.params.id }, product);
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      await productModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  searchProducts: async (req, res) => {
    try {
      n;
      const { prodName } = req.query;
      const foundProd = await productModel.find({
        prodName: { $regex: ".*" + prodName.toUpperCase() + ".*" },
      });
      return res.status(200).json({ isSuccess: true, foundProd });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  getTotalNumbProds: async (req, res) => {
    try {
      const listProds = await productModel
        .find()
        .populate("prodCategory.cateName");
      const totalNumbProds = listProds.length;
      const prodNumbByCate = {
        supplement: 0,
        equipment: 0,
        cloth: 0,
      };
      for (const prod of listProds) {
        // console.log(prodNumbByCate);
        if (prod.prodCategory.cateName.cateName === "Supplement") {
          prodNumbByCate.supplement += 1;
        } else if (prod.prodCategory.cateName.cateName === "Equipment") {
          prodNumbByCate.equipment += 1;
        } else prodNumbByCate.cloth += 1;
      }
      const prodPercentByCate = [
        (prodNumbByCate.supplement / totalNumbProds) * 100,
        (prodNumbByCate.equipment / totalNumbProds) * 100,
        (prodNumbByCate.cloth / totalNumbProds) * 100,
      ];
      return res.status(200).json({
        isSuccess: true,
        totalNumbProds,
        prodPercentByCate,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
};
