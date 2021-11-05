const express = require("express");
const router = express.Router();
const postCtl = require("../controllers/post.controller");
const verifyToken = require("../middlewares/verifyToken.mdw");
const upload = require("../middlewares/uploadFile.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", postCtl.get);
router.post(
  "/",
  verifyToken,
  upload("posts").single("thumbnailFile"),
  postCtl.create
);
// router.put("/:id", verifyToken, postCtl.update);
// router.delete("/:id", verifyToken, postCtl.delete);

// router.post("/like/:id", verifyToken, postCtl.like);

//Post files
router.post("/uploadfiles", upload("posts").single("file"), (req, res) => {
  if (req.file)
    return res.status(200).json({
      isSuccess: true,
      url: `/img/posts/${req.file.filename}`,
      fileName: req.file.filename,
    });
  return res.status(400).json({ isSuccess: false });
});

router.get("/total", verifyToken, verifyAdmin, postCtl.getTotalNumbPosts);
module.exports = router;
