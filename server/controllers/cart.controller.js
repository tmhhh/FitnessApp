const productModel = require("../models/product.model");
const checkIdExist = (listProducts, id) => {
  console.log(listProducts);
  console.log(id);
  return listProducts.findIndex((prod) => prod._id === id);
};
module.exports = {
  addingToCart: async (req, res) => {
    console.log(req);
    
    req.session.userCart = req.query.prodID;

    // console.log(req);
    // try {
    //   const { prodID } = req.query;
    //   if (!prodID) return res.status(400).json({ isSuccess: false });
    //   let foundProd = await productModel.findById(prodID).select("-prodQuan");
    //   foundProd = foundProd.toObject();
    //   foundProd.quantity = 1;
    //   if (!req.session.userCart) {
    //     console.log("if");
    //     req.session.userCart = [foundProd];
    //   } else {
    //     console.log("else");
    //     const index = checkIdExist(req.session.userCart, prodID);
    //     console.log(index);
    //     if (index > 0) req.session.userCart[index].quantity += 1;
    //     else req.session.userCart = [...req.session.userCart, foundProd];
    //   }
    //   //   console.log(req.session.userCart);
    //   res.status(200).json({ isSuccess: true, useCart: req.session.userCart });
    //   // console.log(foundProd);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({ isSuccess: false, error });
    // }
  },
};
