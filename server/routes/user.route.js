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
//FOR MANAGE USER PROFILE INFO
router.put("/profile", verifyToken, userCtl.updateProfile);

//FOR NUTRITION FEATURE PURPOSE
router.put("/profile/tracking-info", verifyToken, userCtl.updateTrackingInfo);
router.put("/profile/food", verifyToken, userCtl.addTrackingFood);
router.delete("/profile/food", verifyToken, userCtl.removeTrackingFood);
module.exports = router;
