const productModel = require("../models/product.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
module.exports = {
  getByHashtag: async (req, res) => {
    try {
      const hashtag = req.query.hashtag;
      const listPost = await postModel
        .find({ hashtag: { $in: hashtag } })
        .populate("user");
      return res.status(200).json({ isSuccess: true, listpost });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },

  get: async (req, res) => {
    const { authorId } = req.query;
    let condition = {};
    if (authorId) condition = { ...condition, author: authorId };
    try {
      const listPost = await postModel.find(condition).populate("author");
      return res.status(200).json({ isSuccess: true, listPost });
    } catch (err) {
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
  create: async (req, res) => {
    const { title, content, hashtag } = req.body;
    try {
      //Add new post
      const post = new postModel({
        title,
        hashtag,
        content,
        thumbnail: req.file ? req.file.filename : "default-post.png",
        author: req.userID,
      });
      await post.save();
      return res.status(200).json({ isSuccess: true, post });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    const postId = req.params.id;
    try {
      const oldPost = await postModel.findById(postId);
      if (!oldPost) return res.status(404).json({ isSuccess: false });
      if (req.userID !== oldPost.author.toString())
        return res.status(403).json({ isSuccess: false });
      //Add new post
      const post = {
        ...req.body,
        author: req.useID,
        thumbnail: req.file ? req.file.filename : oldPost.thumbnail,
      };
      await postModel.updateOne({ _id: postId }, post);
      return res.status(200).json({ isSuccess: true, post: null });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    const postId = req.params.id;
    try {
      const oldPost = await postModel.findById(postId);
      if (!oldPost) return res.status(404).json({ isSuccess: false });
      if (req.userID !== oldPost.author.toString())
        return res.status(403).json({ isSuccess: false });

      await postModel.deleteOne({ _id: postId });
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  like: async (req, res) => {
    try {
      const oldPost = await postModel.findById(req.params.id);
      if (!oldPost) return res.status(404).json({ error: "Post is not found" });
      const update = {
        like: {
          count: ++oldPost.like.count,
          user: oldPost.like.user.push(req.userID) && oldPost.like.user,
        },
      };
      await postModel.updateOne({ _id: oldPost._id }, update);
      return res.json({ isSuccess: true });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },

  pending: async (req, res) => {
    const { userType } = await userModel.findById(req.userID);
    if (userType === 1) return res.status(403).json({ error: "No permission" });
    const status = req.body.isAccepted === true ? "accepted" : "rejected";
    try {
      await postModel.updateOne({ _id: req.params.id }, { status });
      return res.json({ isSuccess: true });
    } catch (error) {
      return res.status(500).json({ isSuccess: false, error });
    }
  },
};
