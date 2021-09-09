const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const handleUserCart = async (userID, productID) => {
  try {
    //GET USER CART BY USER ID
    const user = await userModel
      .findById(userID)
      .populate("userCart.product")
      .select("-userPassword")
      .lean();
    let newCart = [];

    //CHECK IF PRODUCT ALREADY HAS IN USER CART
    let foundProduct = user.userCart.find((e) => {
      if (e.product._id.toString() === productID.toString()) {
        e.quantity += 1;
        return e;
      }
    });
    //// IF EXIST UPDATE  QUANTITY
    if (foundProduct)
      newCart = user.userCart.map((e) => {
        if (e.product._id === productID) return foundProduct;
        return e;
      });
    /// ELSE ADD NEW TO CART
    else newCart = [...user.userCart, { product: productID, quantity: 1 }];

    //UPDATE TO DB
    const updatedCart = await userModel
      .findOneAndUpdate({ _id: userID }, { userCart: newCart }, { new: true })
      .populate("userCart.product");
    console.log(updatedCart.userCart);
    return updatedCart.userCart;
  } catch (error) {
    console.log("catch1");
    console.log(error);
    return Promise.reject(error);
  }
};
module.exports = {
  addingToCart: async (req, res) => {
    try {
      const { prodID } = req.body;
      if (!prodID) return res.status(400).json({ isSuccess: false });

      //CHECK IF ID IS VALID
      let foundProd = await productModel.findById(prodID);
      if (!foundProd)
        return res
          .status(403)
          .json({ isSuccess: false, Error: "Product not found !!!" });

      /// HANDLE ADD TO CART THEN RETURN UPDATED CART
      const updatedCart = await handleUserCart(req.userID, prodID);

      res.status(200).json({ isSuccess: true, updatedCart });
    } catch (error) {
      console.log("catch2");
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
};
