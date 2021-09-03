const userModel = require("../models/user.model");
const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  userLogin: async (req, res) => {
    try {
      const userName = req.body.userName.toString();
      const checkUsername = await userModel.find({ userName }).exec();
      if (checkUsername.length <= 0)
        return res.status(403).json({
          isSuccess: false,
          error: "Username or password is not correct",
        });
      const verifiedPassword = await argon2.verify(
        checkUsername[0].userPassword,
        req.body.userPassword
      );
      if (!verifiedPassword)
        return res.status(400).json({
          isSuccess: false,
          error: "Username or password is not correct ",
        });
      return res.status(200).json({ isSuccess: true, user: checkUsername[0] });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
  userRegister: async (req, res) => {
    try {
      const userName = req.body.userName.toString();
      const checkUsername = await userModel.find({ userName }).exec();
      if (checkUsername.length > 0)
        return res
          .status(403)
          .json({ isSuccess: false, error: "Username has already token" });
      const hashedPassword = await argon2.hash(req.body.userPassword);
      const userInfo = {
        userID: uuidv4(),
        userName,
        userPassword: hashedPassword,
      };
      const newUser = await userModel.create(userInfo);
      return res.status(200).json({ isSuccess: true, user: newUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
};
