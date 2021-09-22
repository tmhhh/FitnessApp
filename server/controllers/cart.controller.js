const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const handleUserCart = async (userID, productID, addedQuantity) => {
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
        e.quantity += addedQuantity;
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
      const { prodID, addedQuantity } = req.body;
      if (!prodID) return res.status(400).json({ isSuccess: false });

      //CHECK IF ID IS VALID
      let foundProd = await productModel.findById(prodID);
      if (!foundProd)
        return res
          .status(403)
          .json({ isSuccess: false, Error: "Product not found !!!" });

      /// HANDLE ADD TO CART THEN RETURN UPDATED CART
      const updatedCart = await handleUserCart(
        req.userID,
        prodID,
        addedQuantity
      );

      res.status(200).json({ isSuccess: true, updatedCart });
    } catch (error) {
      console.log("catch2");
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  deletingFromCart: async (req, res) => {
    const { prodID } = req.query;
    userModel.findById(req.userID, (err, user) => {
      if (err) {
        console.log("error" + err);
        return res
          .status(500)
          .json({ isSuccess: false, error: "Internal Server Error" });
      }

      if (!user)
        return res
          .status(401)
          .json({ isSuccess: false, message: "Unauthorized" });
      user.userCart = user.userCart.filter(
        (prod) => prod.product.toString() !== prodID.toString()
      );

      user.save((err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ isSuccess: false, error: "Internal Server Error" });
        }
        return res.status(200).json({ isSuccess: true, deletedProdID: prodID });
      });
    });

    // return res.status(200).json({ isSuccess: true, deletedProd });
  },
  updatingCart: async (req, res) => {
    const { prodID, quantity } = req.body;
    userModel
      .findById(req.userID)
      .populate({
        path: "userCart.product",
        populate: {
          path: "prodCategory.cateName",
        },
      })
      .then((foundUser) => {
        foundUser.userCart.forEach((prod) => {
          if (prod.product._id.toString() === prodID) {
            prod.quantity = quantity;
          }
          return prod;
        });
        return foundUser.save();
      })
      .then((result) => {
        // PARSE FROM MONGOOSE DOCUMENT TO JS OBJECT
        result = result.toObject();
        //FIND PRODUCT FILTER NAME
        for (const prod of result.userCart) {
          for (const filter of prod.product.prodCategory.cateName.cateFilter) {
            if (
              filter._id.toString() ===
              prod.product.prodCategory.cateFilter._id.toString()
            ) {
              prod.product.prodCategory.cateFilter.filterName =
                filter.filterName;
            }
          }
        }

        //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
        for (const prod of result.userCart) {
          delete prod.product.prodCategory.cateName.cateFilter;
        }
        return res
          .status(200)
          .json({ isSuccess: true, userCart: result.userCart });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ isSuccess: false, error: "Internal Server Error" });
      });
    // console.log(error);
  },
};
