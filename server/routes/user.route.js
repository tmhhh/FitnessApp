const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadFile.mdw");
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
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

//FOR STATISTIC PURPOSE
router.get("/total", verifyToken, verifyAdmin, userCtl.getTotalNumbCustomers);

//FAVORITE PRODUCT
router.put("/favorite/add", verifyToken, userCtl.addFavoriteProduct);
router.put("/favorite/remove", verifyToken, userCtl.removeFavoriteProduct);

//SCHEDULE
router.delete("/workout-schedule", verifyToken, userCtl.removeWorkoutSchedule);
router.post("/workout-schedule", verifyToken, userCtl.addWorkOutSchedule);

module.exports = router;
