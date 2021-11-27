const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadFile.mdw");
const verifyToken = require("../middlewares/verifyToken.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");
const serviceCtl = require("../controllers/service.controller");

router
  .get("/service", serviceCtl.getAll)
  .post(
    "/service",
    verifyToken,
    verifyAdmin,
    upload("services").fields([
      { name: "thumbnailFile", maxCount: 1 },
      { name: "imagesFile", maxCount: 6 },
    ]),
    serviceCtl.create
  )
  .put(
    "/service",
    verifyToken,
    verifyAdmin,
    upload("services").fields([
      { name: "thumbnailFile", maxCount: 1 },
      { name: "imagesFile", maxCount: 6 },
    ]),
    serviceCtl.update
  )
  .delete("/service", verifyToken, verifyAdmin, serviceCtl.delete)
  .post("/service/register", serviceCtl.register);

module.exports = router;
