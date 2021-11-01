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
      console.log(user[0].trackingInfo);

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
  updateTrackingInfo: async (req, res) => {
    try {
      const { trackingInfo } = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.userID,
        {
          trackingInfo,
        },
        { new: true }
      );
      // console.log(updatedUser);
      return res.status(200).json({ isSuccess: true, updatedUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  addTrackingFood: async (req, res) => {
    try {
      const {
        food: { addedDate, id, foodServing, mealType },
        food,
      } = req.body;
      console.log(typeof foodServing);
      let updatedUser = null;
      const foundUser = await userModel.findById(req.userID);

      //CHECK IF USER HAS ADDED YET IN CURRENT DATE
      if (foundUser.trackingInfo.trackingFood.addedDate !== addedDate) {
        updatedUser = await userModel.findByIdAndUpdate(req.userID, {
          "trackingInfo.trackingFood": {
            addedDate,
            listFoods: { ...food, foodServing: foodServing.toString() },
          },
        });
        return res.status(200).json({ isSuccess: true, updatedUser });
      }
      //USER HAS ADDED BEFORE IN THE DAY
      else {
        //CHECK IF THAT FOOD EXIST IN DB OR NOT
        const checkFoodExist =
          foundUser.trackingInfo.trackingFood.listFoods.find(
            (e) => e.id === id && e.mealType === mealType
          );
        if (!checkFoodExist) {
          foundUser.trackingInfo.trackingFood.listFoods.push(food);
          console.log(foundUser.listFoods);
          await foundUser.save();
        } else {
          // UPDATE FOOD SERVING
          checkFoodExist.foodServing =
            parseFloat(checkFoodExist.foodServing) + parseFloat(foodServing);
          foundUser.trackingInfo.trackingFood.listFoods.map((food) => {
            if (food.id === checkFoodExist.id) return checkFoodExist;
            else return food;
          });
          await foundUser.save();
        }
        return res
          .status(200)
          .json({ isSuccess: true, updatedUser: foundUser });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  removeTrackingFood: async (req, res) => {
    try {
      const { id } = req.query;
      const foundUser = await userModel.findById(req.userID);
      foundUser.trackingInfo.trackingFood.listFoods =
        foundUser.trackingInfo.trackingFood.listFoods.filter(
          (e) => e.id !== id
        );
      const updatedUser = await foundUser.save();
      console.log(updatedUser.trackingInfo.trackingFood);
      return res.status(200).json({ isSuccess: true, updatedUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
};
