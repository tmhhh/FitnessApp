const userModel = require("../models/user.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
module.exports = {
  userVerify: async (req, res) => {
    try {
      const user = await userModel
        .findById(req.userID)
        .populate({
          path: "userCart.product",
          populate: {
            path: "prodCategory.cateName",
          },
        })
        .select("-userPassword")
        .lean();

      //FIND PRODUCT FILTER NAME
      for (const prod of user.userCart) {
        for (const filter of prod.product.prodCategory.cateName.cateFilter) {
          if (
            filter._id.toString() ===
            prod.product.prodCategory.cateFilter._id.toString()
          ) {
            prod.product.prodCategory.cateFilter.filterName = filter.filterName;
          }
        }
      }

      //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
      for (const prod of user.userCart) {
        delete prod.product.prodCategory.cateName.cateFilter;
      }
      return res.status(200).json({ isSuccess: true, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
  userLogin: async (req, res) => {
    try {
      const userNameID = req.body.userNameID.toString();
      const user = await userModel
        .find({ userNameID })
        .populate("userCart.product");
      if (user.length <= 0)
        return res.status(403).json({
          isSuccess: false,
          error: "Username or password is not correct",
        });
      const verifiedPassword = await argon2.verify(
        user[0].userPassword,
        req.body.userPassword
      );
      if (!verifiedPassword)
        return res.status(403).json({
          isSuccess: false,
          error: "Username or password is not correct ",
        });
      //GENERATE ACCESS TOKEN
      const accessToken = jwt.sign(
        {
          userID: user[0]._id.toString(),
        },
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      user[0] = user[0].toObject();
      delete user[0].userPassword;
      return res
        .status(200)
        .json({ isSuccess: true, user: user[0], accessToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
  userRegister: async (req, res) => {
    try {
      const userNameID = req.body.userNameID.toString();
      const user = await userModel.find({ userNameID });
      if (user.length > 0)
        return res
          .status(400)
          .json({ isSuccess: false, error: "Username has already taken" });
      const hashedPassword = await argon2.hash(req.body.userPassword);
      const newUser = await userModel.create({
        userNameID,
        userName: req.body.userName.toString(),
        userImage: req.body.userImage,
        userPassword: hashedPassword,
      });
      return res.status(200).json({ isSuccess: true, user: newUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
};
