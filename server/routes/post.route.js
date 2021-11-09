const express = require("express");
const router = express.Router();
const postCtl = require("../controllers/post.controller");
const verifyToken = require("../middlewares/verifyToken.mdw");
const upload = require("../middlewares/uploadFile.mdw");
const verifyAdmin = require("../middlewares/verifyAdmin");

//FOR STATISTICS
router.get("/total", verifyToken, verifyAdmin, postCtl.getTotalNumbPosts);

//CRUD
router.get("/:id", verifyToken, verifyAdmin, postCtl.getById);
router.get("/", verifyToken, verifyAdmin, postCtl.get);
router.post(
  "/",
  verifyToken,
  upload("posts").single("thumbnailFile"),
  postCtl.create
);
router.put(
  "/:id",
  verifyToken,
  upload("posts").single("thumbnailFile"),
  postCtl.update
);

router.delete("/:id", verifyToken, postCtl.delete);

//Like && comment
router.put("/like/:id", verifyToken, postCtl.like);
router.delete("/like/:id", verifyToken, postCtl.unlike);

router.get("/comment/:id", postCtl.getComment);
router.post("/comment/:id", verifyToken, postCtl.comment);
router.put("/comment/:commentId", verifyToken, postCtl.editComment);
router.delete("/comment/:commentId", verifyToken, postCtl.deleteComment);

//Pending
router.put("/pending/:id", verifyToken, postCtl.pending);

//Post files
router.post(
  "/uploadfiles",
  verifyToken,
  upload("posts").single("file"),
  (req, res) => {
    if (req.file)
      return res.status(200).json({
        isSuccess: true,
        url: `/img/posts/${req.file.filename}`,
        fileName: req.file.filename,
      });
    return res.status(400).json({ isSuccess: false });
  }
);

module.exports = router;
