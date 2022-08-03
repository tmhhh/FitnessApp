const userModel = require("../models/user.model");
module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userID);
    if (user.userType !== 1)
      return res
        .status(403)
        .json({ isSuccess: false, message: "Permission required" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
