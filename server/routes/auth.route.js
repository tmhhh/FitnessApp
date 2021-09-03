const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMdw = require("../middlewares/verifyToken.mdw");
router.get("/verify", authMdw, userController.userVerify);
router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);

module.exports = router;
