const express = require("express");
const router = express.Router();
const postCtl = require("../controllers/post.controller");
const authMdw = require("../middlewares/verifyToken.mdw");
const upload = require("../middlewares/uploadFile.mdw");

router.get("/", postCtl.get);
router.post(
  "/",
  authMdw,
  upload("posts").single("thumbnailFile"),
  postCtl.create
);
router.put(
  "/:id",
  authMdw,
  upload("posts").single("thumbnailFile"),
  postCtl.update
);

router.delete("/:id", authMdw, postCtl.delete);

router.put("/like/:id", authMdw, postCtl.like);
router.put("/pending/:id", authMdw, postCtl.pending);
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

module.exports = router;
