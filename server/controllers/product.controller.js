const productModel = require("../models/product.model");
module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const listProducts = await productModel.find();
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
      console.log(product, req.files.imagesFile);
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
    console.log("body" + req.body.prodName);
    console.log("query" + req.query.prodName);

    try {
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
};
