const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMdw = require("../middlewares/verifyToken.mdw");

router.get("/verify", authMdw, userController.userVerify);
router.post("/register", userController.userRegister);

//LOGIN ROUTES
router.use("/login", require("./login.route"));

module.exports = router;
