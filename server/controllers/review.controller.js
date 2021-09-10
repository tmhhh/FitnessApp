const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
module.exports = {
  getByProductId: async (req, res) => {
    try {
      const productId = req.query.productId;
      const listReview = await reviewModel
        .find({ of_product: productId })
        .populate("user");
      return res.status(200).json({ isSuccess: true, listReview });
    } catch (error) {
      console.log(error);
      return res
        .satus(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    const { productId, content, rating } = req.body;
    try {
      //Add new review
      const review = new reviewModel({
        user: req.userID,
        of_product: productId,
        content: content,
        rating: +rating,
      });
      await review.save();

      //Add rating
      const product = await productModel.findById(productId);
      let {
        prodRating: { num_of_reviewers, star },
      } = product;
      const newRating = {
        prodRating: {
          num_of_reviewers: num_of_reviewers + 1,
          star: (num_of_reviewers * star + +rating) / (num_of_reviewers + 1),
        },
      };
      await productModel.updateOne({ _id: productId }, newRating);

      return res.status(200).json({ isSuccess: true, review });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {
      const review = { ...req.body };
      await reviewModel.updateOne({ _id: req.params.id }, review);
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      await reviewModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ isSuccess: true });
    } catch (err) {
      return res
        .status(500)
        .json({ isSuccess: false, error: "Internal Server Error" });
    }
  },
};
