const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userModel = require("../models/user.model");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
router.post("/", userController.userLogin);
//GET FB LOGIN DATA
router.get("/data", (req, res) => {
  try {
    if (req.user) {
      const accessToken = jwt.sign(
        { userID: req.user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      const loginUser = req.user;
      // req.logOut();
      // req.session.destroy();
      return res.status(200).json({ isSuccess: true, accessToken, loginUser });
    }
    return res.status(401).json({ isSuccess: false, error: "User not found" });
  } catch (error) {
    console.log(error);
  }
});

//GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate("google", {
    session: true,
    scope: ["profile", "email"],
  })
);

// router.get("/google/callback", function (req, res, next) {
//   passport.authenticate("google", function (err, user) {
//     console.log({ err, user });
//     // if (err) return res.status(500).json({ isSuccess: false, err });
//     // if (!user)
//     //   return res.status(401).json({ isSuccess: false, err: "Unauthorized" });
//     // // return res.redirect("/api/auth/login/data");
//     return res.send("<script>window.close()</script>");
//     // return res.status(200).json({ isSuccess: true, loginUser: user });
//   })(req, res, next);
// });

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "276022586484-2s9ui1rmhqvc8a6csc05nn2vcnva453d.apps.googleusercontent.com",
      clientSecret: "VoKthWq43LJJ6mSd4jTU8pzO",
      callbackURL:
        // "https://apiserver-fitnessapp.herokuapp.com/api/auth/login/google/callback",
        process.env.server_URL + "/auth/login/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const { name, picture, email } = profile._json;
        const foundUser = await userModel.findOne({
          userNameID: profile._json.email,
        });
        if (!foundUser) {
          const addedUser = await userModel.create({
            userNameID: email,
            userName: name,
            userImage: picture,
            userEmail: email,
          });
          // console.log({ addedUser });
          cb(null, addedUser);
        }
        cb(null, foundUser);
      } catch (error) {
        console.log(error);
        cb(error);
      }
    }
  )
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // return res.status(200).json({ isSuccess: true, loginUser: req.user });
    res.send("<script>window.close()</script>");
    // res.send("hi");
  }
);

passport.serializeUser((user, done) => {
  console.log("serial ");
  console.log({ user });
  done(null, user._id);
});

passport.deserializeUser(async (userID, done) => {
  try {
    console.log("deserializeUser");
    const deserializedUser = await userModel
      .findById(userID)
      .select("-userPassword");
    if (deserializedUser) {
      return done(null, deserializedUser);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
    done(error, false);
  }
});

//FACEBOOK LOGIN
router.get("/fb", passport.authenticate("facebook"));
router.get(
  "/fb/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // return res.status(200).json({ isSuccess: true, loginUser: req.user });

    res.send("<script>window.close()</script>");
  }
);

// router.get(
//   "/fb/callback",
//   passport.authenticate("facebook", function (req, res, next) {
//     passport.authenticate("facebook", function (err, user) {
//       return res.send("<script>window.close();</script > ");

//       // if (user) {
//       //   return res.send("<script>window.close();</script > ");
//       // }
//       // return res.redirect("http://localhost:4000/api/auth/login/fb");
//     });
//   })
// );
passport.use(
  new FacebookStrategy(
    {
      clientID: "1061366784392713",
      clientSecret: "1518fc9d11dd2986c0d9d35febed8164",
      callbackURL: process.env.server_URL + "/auth/login/fb/callback",

      // "https://df65-116-108-254-50.ngrok.io/api/auth/login/fb/callback",
      profileFields: ["email", "displayName"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log({ profile });
        const { name, picture, email } = profile._json;
        const foundUser = await userModel.findOne({
          userNameID: profile._json.email,
        });
        if (!foundUser) {
          const addedUser = await userModel.create({
            userNameID: email,
            userName: name,
            userImage: picture,
            userEmail: email,
          });
          // console.log({ addedUser });
          cb(null, addedUser);
        }

        cb(null, foundUser);
      } catch (error) {
        console.log(error);
        cb(error);
      }
    }
  )
);

module.exports = router;
