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
  searchProducts: async (req, res) => {
    try {
      const { prodName } = req.query;
      console.log(prodName);
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
