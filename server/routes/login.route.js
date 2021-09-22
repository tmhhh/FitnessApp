const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userModel = require("../models/user.model");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

router.post("/", userController.userLogin);
//GET FB LOGIN DATA
router.get("/data", (req, res) => {
  if (req.user)
    return res.status(200).json({ isSuccess: true, loginUser: req.user });
  return res.status(500);
});
//FACEBOOK LOGIN
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    return res.send("<script>window.close();</script > ");
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "276022586484-2s9ui1rmhqvc8a6csc05nn2vcnva453d.apps.googleusercontent.com",
      clientSecret: "VoKthWq43LJJ6mSd4jTU8pzO",
      callbackURL: "http://localhost:4000/api/auth/login/google/callback",
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
          });
          console.log({ addedUser });
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
passport.serializeUser((user, done) => {
  console.log("serial ");

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

//FACEBOOK
router.get("/fb", passport.authenticate("facebook"));
router.get(
  "/fb/callback",
  passport.authenticate("facebook", function (req, res, next) {
    passport.authenticate("facebook", function (err, user) {
      return res.send("<script>window.close();</script > ");

      // if (user) {
      //   return res.send("<script>window.close();</script > ");
      // }
      // return res.redirect("http://localhost:4000/api/auth/login/fb");
    });
  })
);
passport.use(
  new FacebookStrategy(
    {
      clientID: "1061366784392713",
      clientSecret: "1518fc9d11dd2986c0d9d35febed8164",
      callbackURL:
        "https://201d-2402-800-6370-d8d5-c81a-8132-b06a-f9cf.ngrok.io/api/auth/login/fb/callback",
      profileFields: ["email", "displayName"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // console.log({ profile });
        const { name, picture, email } = profile._json;
        const foundUser = await userModel.findOne({
          userNameID: profile._json.email,
        });
        if (!foundUser) {
          const addedUser = await userModel.create({
            userNameID: email,
            userName: name,
            userImage: picture,
          });
          console.log({ addedUser });
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
