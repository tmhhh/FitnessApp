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

      //CHECK IF USER HAS ITEM IN CART
      if (user.userCart.length > 0) {
        //FIND PRODUCT FILTER NAME
        for (const prod of user.userCart) {
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
        for (const prod of user.userCart) {
          delete prod.product.prodCategory.cateName.cateFilter;
        }
      }

      return res.status(200).json({ isSuccess: true, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }

    // const prod = await userModel
    //   .find()
    //   .populate({
    //     path: "userCart.product",
    //     select: "prodName",
    //     match: { prodName: "ISO HD" },
    //   })
    //   .select("userCart userNameID");
    // res.json(prod);
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
        ...req.body,
        userImage: "default_avatar.png",
        userPassword: hashedPassword,
      });
      return res.status(200).json({ isSuccess: true, user: newUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      // console.log(req.files.filename);
      const foundUser = await userModel.findById(req.userID);
      foundUser.userImage = req.files.userImage[0].filename;
      await foundUser.save();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const hashedPassword = await argon2.hash(req.body.userPassword);
      const foundUser = await userModel
        .findById(req.userID)
        // .populate({
        //   path: "userCart.product",
        //   populate: {
        //     path: "prodCategory.cateName",
        //   },
        // })
        .select("-userPassword");

      foundUser.userName = req.body.userName;
      foundUser.userPassword = hashedPassword;
      foundUser.userEmail = req.body.userEmail;
      foundUser.userPhone = parseInt(req.body.userPhone);

      await foundUser.save();

      // foundUser = foundUser.toObject();
      // //
      // //CHECK IF USER HAS ITEM IN CART
      // if (foundUser.userCart.length > 0) {
      //   //FIND PRODUCT FILTER NAME
      //   for (const prod of foundUser.userCart) {
      //     for (const filter of prod.product.prodCategory.cateName.cateFilter) {
      //       if (
      //         filter._id.toString() ===
      //         prod.product.prodCategory.cateFilter._id.toString()
      //       ) {
      //         prod.product.prodCategory.cateFilter.filterName =
      //           filter.filterName;
      //       }
      //     }
      //   }

      //   //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
      //   for (const prod of foundUser.userCart) {
      //     delete prod.product.prodCategory.cateName.cateFilter;
      //   }
      // }
      return res.status(200).json({ isSuccess: true, updatedUser: foundUser });
    } catch (error) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
};
