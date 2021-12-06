const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadFile.mdw");
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
const serviceCtl = require("../controllers/service.controller");

router
  .get("/", serviceCtl.getAll)
  .post(
    "/",
    verifyToken,
    verifyAdmin,
    upload("services").fields([
      { name: "thumbnailFile", maxCount: 1 },
      { name: "imagesFile", maxCount: 6 },
    ]),
    serviceCtl.create
  )
  .put(
    "/",
    verifyToken,
    verifyAdmin,
    upload("services").fields([
      { name: "thumbnailFile", maxCount: 1 },
      { name: "imagesFile", maxCount: 6 },
    ]),
    serviceCtl.update
  )
  .delete("/", verifyToken, verifyAdmin, serviceCtl.delete)
  .post("/register", verifyToken, serviceCtl.register)
  .delete("/register/:id", verifyToken, serviceCtl.unregister);

module.exports = router;
