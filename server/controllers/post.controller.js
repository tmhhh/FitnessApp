const productModel = require("../models/product.model");
const postModel = require("../models/post.model");
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
        .satus(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  get: async (req, res) => {
    try {
      const listPost = await postModel.find({}).populate("author");
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
    try {
      const post = { ...req.body };
      await postModel.updateOne({ _id: req.params.id }, post);
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      await postModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  like: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postModel.findById(postId);
      const {
        like: { count, people },
      } = post;
      if (people.indexOf(req.userID) < 0) {
        const change = {
          like: {
            count: count + 1,
            people: [...people, req.userID],
          },
        };
        await postModel.updateOne({ _id: postId }, change);
      }
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },
};
