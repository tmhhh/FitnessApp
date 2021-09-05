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
};
