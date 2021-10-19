const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadFile.mdw");
const verifyToken = require("../middlewares/verifyToken.mdw");
const userCtl = require("../controllers/user.controller");
router.put(
  "/avatar",
  verifyToken,
  upload("users").fields([{ name: "userImage", maxCount: 1 }]),
  userCtl.updateAvatar
);
router.put("/profile", verifyToken, userCtl.updateProfile);
module.exports = router;
