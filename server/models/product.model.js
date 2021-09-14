const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Products = new Schema({
  prodName: { type: String, required: true },
  prodCategory: {
    type: Schema.Types.ObjectId,
    ref: "Categories.cateFilter._id",
    required: true,
  },
  prodDescription: { type: String, required: false },
  prodPrice: { type: Number, required: true },
  prodRating: {
    num_of_reviewers: { type: String, default: 0 },
    star: { type: Number, default: 0 },
  },
  prodThumbnail: { type: String, required: true },
  prodImages: [{ type: String }],
  prodQuantity: { type: Number, default: 1 },
});
module.exports = mongoose.model("Products", Products);
