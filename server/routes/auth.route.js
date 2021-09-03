const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);

module.exports = router;
