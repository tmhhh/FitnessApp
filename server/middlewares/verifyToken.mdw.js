const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.header("Authorization"))
      return res
        .status(401)
        .json({ isSuccess: false, error: "Access token not found" });
    const authHeader = req.header("Authorization");
    const accessToken = authHeader.split(" ")[1];
    const check = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.userID = check.userID;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ isSuccess: false, error });
  }
};
