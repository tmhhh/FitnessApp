const userModel = require("../models/user.model");
const prodModel = require("../models/product.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const mapFavoriteProdsCate = (user) => {
  for (const prod of user.favoriteProducts) {
    for (const filter of prod.prodCategory.cateName.cateFilter) {
      if (
        filter._id.toString() === prod.prodCategory.cateFilter._id.toString()
      ) {
        prod.prodCategory.cateFilter.filterName = filter.filterName;
      }
    }
  }
  for (const prod of user.favoriteProducts) {
    delete prod.prodCategory.cateName.cateFilter;
  }
};
const mapProdCategory = (user) => {
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
  mapFavoriteProdsCate(user);
};
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
        .populate("workoutSchedule.exercise")
        .populate({
          path: "favoriteProducts",
          populate: {
            path: "prodCategory.cateName",
          },
        })
        .select("-userPassword")
        .lean();
      //CHECK IF USER HAS ITEM IN CART
      if (user.userCart.length > 0) {
        //FIND PRODUCT FILTER NAME
        // for (const prod of user.userCart) {
        //   for (const filter of prod.product.prodCategory.cateName.cateFilter) {
        //     if (
        //       filter._id.toString() ===
        //       prod.product.prodCategory.cateFilter._id.toString()
        //     ) {
        //       prod.product.prodCategory.cateFilter.filterName =
        //         filter.filterName;
        //     }
        //   }
        // }
        // for (const prod of user.favoriteProducts) {
        //   for (const filter of prod.product.prodCategory.cateName.cateFilter) {
        //     if (
        //       filter._id.toString() ===
        //       prod.product.prodCategory.cateFilter._id.toString()
        //     ) {
        //       prod.product.prodCategory.cateFilter.filterName =
        //         filter.filterName;
        //     }
        //   }
        // }
        // for (const prod of user.favoriteProducts) {
        //   delete prod.product.prodCategory.cateName.cateFilter;
        // }
        // //REMOVE CATE FIlTER PROPERTIES IN CATE NAME OF PRODUCT
        // for (const prod of user.userCart) {
        //   delete prod.product.prodCategory.cateName.cateFilter;
        // }
        mapProdCategory(user);
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
        // .populate("userCart.product favoriteProducts");
        .populate({
          path: "userCart.product",
          populate: {
            path: "prodCategory.cateName",
          },
        })
        .populate("workoutSchedule.exercise")
        .populate({
          path: "favoriteProducts",
          populate: {
            path: "prodCategory.cateName",
          },
        });
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
      // console.log(user[0].trackingInfo);
      if (user[0].userCart.length > 0) {
        mapProdCategory(user[0]);
      }
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
      if (Object.keys(req.files).length <= 0) {
        return res
          .status(400)
          .json({ isSuccess: false, message: "User haven't chosen image" });
      }
      foundUser.userImage = req.files.userImage[0].filename;
      await foundUser.save();
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { userName, userEmail, userPhone } = req.body;
      const foundUser = await userModel
        .findByIdAndUpdate(
          req.userID,
          {
            userName,
            userEmail,
            userPhone,
          },
          { new: true }
        )
        // .populate({
        //   path: "userCart.product",
        //   populate: {
        //     path: "prodCategory.cateName",
        //   },
        // })
        .select("-userPassword");

      // foundUser.userName = req.body.userName;
      // foundUser.userPassword = hashedPassword;
      // foundUser.userEmail = req.body.userEmail;
      // foundUser.userPhone = parseInt(req.body.userPhone);

      // await foundUser.save();

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
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const hashedPassword = await argon2.hash(newPassword);

      const updatedUser = await userModel.findByIdAndUpdate(req.userID, {
        userPassword: hashedPassword,
      });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  updateTrackingInfo: async (req, res) => {
    try {
      console.log("HELLO");
      const { trackingInfo } = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.userID,
        {
          trackingInfo: trackingInfo,
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
  updateTrainingGoal: async (req, res) => {
    try {
      const { userGoal } = req.body;
      await userModel.findByIdAndUpdate(req.userID, {
        "trackingInfo.userGoal": userGoal,
      });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  addTrackingFood: async (req, res) => {
    try {
      const {
        food: { addedDate, goalKCAL },
        food,
      } = req.body;
      const foundUser = await userModel.findById(req.userID);
      let updatedUser = null;
      //CHECK IF USER HAS ADDED YET IN CURRENT DATE
      const checkUserTrackingFood = foundUser.trackingInfo.trackingFood.find(
        (item) => item.addedDate === addedDate
      );
      if (checkUserTrackingFood) {
        const isAddedBeforeFood = checkUserTrackingFood.listFoods.find(
          (item) => item.id === food.id + food.mealType
        );
        if (isAddedBeforeFood) {
          checkUserTrackingFood.listFoods = checkUserTrackingFood.listFoods.map(
            (item) => {
              if (item.id === food.id + food.mealType) {
                item.foodServing = +item.foodServing + +food.foodServing;
                return item;
              } else {
                return item;
              }
            }
          );
          updatedUser = await userModel.findByIdAndUpdate(
            req.userID,
            {
              "trackingInfo.trackingFood": checkUserTrackingFood,
            },
            { new: true }
          );
        } else {
          checkUserTrackingFood.listFoods.push({
            ...food,
            id: food.id + food.mealType,
          });
          updatedUser = await userModel.findByIdAndUpdate(
            req.userID,
            {
              "trackingInfo.trackingFood": checkUserTrackingFood,
            },
            { new: true }
          );
        }
      } else {
        foundUser.trackingInfo.trackingFood.push({
          goalKCAL,
          listFoods: [{ ...food, id: food.id + food.mealType }], // id need to be unique in order to integrate with remove food API
        });
        updatedUser = await foundUser.save();
      }
      return res.status(200).json({ isSuccess: true, updatedUser });
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
      const addedDate = new Date().toLocaleDateString();
      const foundUser = await userModel.findById(req.userID);
      foundUser.trackingInfo.trackingFood =
        foundUser.trackingInfo.trackingFood.map((item) => {
          if (item.addedDate === addedDate) {
            return {
              ...item.toObject(), //convert mongoose object to js object
              listFoods: item.listFoods.filter((food) => food.id !== id),
            };
          } else return item;
        });

      const updatedUser = await userModel.findByIdAndUpdate(
        req.userID,
        {
          "trackingInfo.trackingFood": foundUser.trackingInfo.trackingFood,
        },
        { new: true }
      );
      return res.status(200).json({ isSuccess: true, updatedUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal Server Error" });
    }
  },
  getTotalNumbCustomers: async (req, res) => {
    try {
      const totalNumbCustomers = await userModel.count();
      return res.status(200).json({ isSuccess: true, totalNumbCustomers });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  addFavoriteProduct: async (req, res) => {
    try {
      const { id } = req.body;
      const foundUser = await userModel.findById(req.userID);
      foundUser.favoriteProducts.push(id);

      //UPDATE PRODUCT'S FAVORITE COUNT (Increase 1)
      const updatedProd = prodModel.findByIdAndUpdate(id, {
        $inc: { "prodRating.favorite_count": 1 },
      });
      let [updatedUser] = await Promise.all([foundUser.save(), updatedProd]);

      //POPULATE FIELD
      updatedUser = await updatedUser.populate({
        path: "favoriteProducts",
        populate: {
          path: "prodCategory.cateName",
        },
      });
      mapFavoriteProdsCate(updatedUser);
      return res
        .status(200)
        .json({ isSuccess: true, addedFavorite: updatedUser.favoriteProducts });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  removeFavoriteProduct: async (req, res) => {
    try {
      const { id } = req.body;
      const foundUser = await userModel.findById(req.userID);

      foundUser.favoriteProducts = foundUser.favoriteProducts.filter(
        (prod) => prod.toString() !== id.toString()
      );
      //UPDATE PRODUCT'S FAVORITE COUNT (Decrease 1)
      const updatedProd = prodModel.findByIdAndUpdate(id, {
        $inc: { "prodRating.favorite_count": -1 },
      });
      const listRes = await Promise.all([foundUser.save(), updatedProd]);
      return res.status(200).json({ isSuccess: true, removedFavorite: id });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  addWorkOutSchedule: async (req, res) => {
    try {
      const { exerciseID, createdDate } = req.body;
      const foundUser = await userModel.findById(req.userID);
      if (!foundUser)
        return res
          .status(401)
          .json({ isSuccess: false, message: "User not found" });

      if (foundUser.workoutSchedule.length > 0) {
        //CHECK IF THIS EXERCISE HAS ALREADY ADDED IN THE SAME DATE
        if (
          foundUser.workoutSchedule.some(
            (e) =>
              e.exercise.toString() === exerciseID.toString() &&
              e.createdDate === createdDate
          )
        )
          return res.status(400).json({
            isSuccess: false,
            message: "This exercise has already been added",
          });
      }

      foundUser.workoutSchedule.push({
        exercise: exerciseID,
        createdDate: createdDate,
      });
      let updatedUser = await userModel
        .findByIdAndUpdate(
          req.userID,
          {
            workoutSchedule: foundUser.workoutSchedule,
          },
          { new: true }
        )
        .populate("workoutSchedule.exercise");
      return res
        .status(200)
        .json({ isSuccess: true, addedExercise: updatedUser.workoutSchedule });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
  removeWorkoutSchedule: async (req, res) => {
    try {
      const { exerciseID, createdDate } = req.body;
      const foundUser = await userModel.findById(req.userID);
      foundUser.workoutSchedule = foundUser.workoutSchedule.filter((e) => {
        if (
          e.exercise.toString() !== exerciseID.toString() ||
          (e.exercise.toString() === exerciseID.toString() &&
            e.createdDate !== createdDate)
        ) {
          return true;
        }
        return false;
      });
      await foundUser.save();
      return res.status(200).json({
        isSuccess: true,
        removedExercise: exerciseID,
        createdDate,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Server Internal Error" });
    }
  },
};
