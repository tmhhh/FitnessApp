const productModel = require("../models/product.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const commentModel = require("../models/comment.model");
const replyModel = require("../models/reply.model");
module.exports = {
  getByHashtag: async (req, res) => {
    try {
      const hashtag = req.query.hashtag;
      const listPost = await postModel
        .find({ hashtag: { $in: hashtag } })
        .populate("user");
      return res.status(200).json({ isSuccess: true, listPost });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  get: async (req, res) => {
    const { authorId, status } = req.query;
    let condition = {};
    if (authorId) condition = { ...condition, author: authorId };
    if (status) condition = { ...condition, status };
    try {
      const listPost = await postModel.find(condition).populate("author");
      return res.status(200).json({ isSuccess: true, listPost });
    } catch (err) {
      return res.status(500).json({ isSuccess: false, error: err });
    }
  },

  getById: async (req, res) => {
    try {
      console.log(req.params.id);
      const post = await postModel.findById(req.params.id).populate("author");

      return res.status(200).json({ isSuccess: true, post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
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
    const user = await userModel.findById(req.userID);
    try {
      const oldPost = await postModel.findById(postId);
      if (!oldPost) return res.status(404).json({ isSuccess: false });
      if (req.userID !== oldPost.author.toString() && user.userType !== 1)
        return res.status(403).json({ isSuccess: false });

      const post = {
        ...req.body,
        thumbnail: req.file ? req.file.filename : oldPost.thumbnail,
      };
      await postModel.updateOne({ _id: postId }, post);
      return res.status(200).json({ isSuccess: true, post });
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
  like: async (req, res) => {
    try {
      const oldPost = await postModel.findById(req.params.id);
      if (!oldPost) return res.status(404).json({ error: "Post is not found" });
      if (oldPost.like.user.includes(req.userID))
        return res.json({ isSuccess: true });
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
  unlike: async (req, res) => {
    try {
      const oldPost = await postModel.findById(req.params.id);
      if (!oldPost) return res.status(404).json({ error: "Post is not found" });
      if (!oldPost.like.user.includes(req.userID))
        return res.json({ isSuccess: true, message: "You haven't liked" });
      const update = {
        like: {
          count: --oldPost.like.count,
          user: oldPost.like.user.filter((userId) => userId != req.userID),
        },
      };
      await postModel.updateOne({ _id: oldPost._id }, update);
      return res.json({ isSuccess: true });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },

  comment: async (req, res) => {
    try {
      const comment = new commentModel({
        author: req.userID,
        content: req.body.content,
        of_post: postId,
      });
      if (req.body.commentId) {
        commentModel.findById(req.body.commentId).then((parent) => {
          parent.replies.push(comment._id);
          parent.save();
        });
      }
      await comment.save();
      return res.status(200).json({ isSuccess: true, comment });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  getComment: async (req, res) => {
    try {
      const comments = await commentModel
        .find({ of_post: req.params.id })
        .populate("author")
        .populate({
          path: "replies",
          populate: { path: "author", model: "User" },
        });
      // PROBLEM
      // const listComment = comments.reduce((acc, comment) => {
      //   const test = comment.replies?.reduce((acc, reply) => {
      //     // const { userName } = await userModel.findById(reply.author);
      //     reply = { ...reply, author: "userName" };
      //     return [...acc, reply];
      //   }, []);
      //   console.log(test);
      //   comment = { ...comment, replies: test };
      //   return [...acc, comment];
      // }, []);
      // listComment.forEach((e) => {
      //   // console.log(e.replies);
      // });

      return res.json({ isSuccess: true, comments: comments });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  editComment: async (req, res) => {
    const commentId = req.params.commentId;
    try {
      const comment = await commentModel.findById(commentId);
      if (!comment) return res.status(404).json({ isSuccess: false });
      if (req.userID !== comment.author.toString())
        return res.status(403).json({ isSuccess: false });

      await commentModel.updateOne(
        { _id: commentId },
        {
          content: req.body.content,
        }
      );
      return res.status(200).json({ isSuccess: true, comment });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;
    try {
      const comment = await commentModel.findById(commentId);
      if (!comment) return res.status(404).json({ isSuccess: false });
      if (req.userID !== comment.author.toString())
        return res.status(403).json({ isSuccess: false });

      await commentModel.deleteOne({ _id: commentId });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  reply: async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const userId = req.userID;
    try {
      const reply = new replyModel({
        author: userId,
        content,
        of_comment: commentId,
      });

      await reply.save();
      return res.status(200).json({ isSuccess: true, reply });
    } catch (error) {
      console.log("err: ", error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  editReply: async (req, res) => {
    const replyId = req.params.replyId;
    try {
      const reply = await replyModel.findById(replyId);
      if (!reply) return res.status(404).json({ isSuccess: false });
      if (req.userID !== reply.author.toString())
        return res.status(403).json({ isSuccess: false });

      await replyModel.updateOne(
        { _id: replyId },
        {
          content: req.body.content,
        }
      );
      return res.status(200).json({ isSuccess: true, reply });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  deleteReply: async (req, res) => {
    const replyId = req.params.replyId;
    try {
      const reply = await replyModel.findById(replyId);
      if (!reply) return res.status(404).json({ isSuccess: false });
      if (req.userID !== reply.author.toString())
        return res.status(403).json({ isSuccess: false });

      await replyModel.deleteOne({ _id: replyId });
      return res.status(200).json({ isSuccess: true, reply });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: true, message: "Server Internal Error" });
    }
  },
  getTotalNumbPosts: async (req, res) => {
    try {
      const totalNumbPosts = await postModel.count();
      return res.status(200).json({ isSuccess: true, totalNumbPosts });
    } catch (error) {
      return res
        .status(500)
        .json({ isSuccess: true, message: "Server Internal Error" });
    }
  },
};
