const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Products = new Schema({
  prodName: { type: String, required: true },
  prodCategory: {
    cateName: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    cateFilter: {
      _id: {
        type: Schema.Types.ObjectID,
        ref: "Categories.cateFilter",
        index: 0,
        required: true,
      },
    },
  },
  prodDescription: { type: String, required: false },
  prodPrice: { type: Number, required: true },
  prodRating: {
    num_of_reviewers: { type: Number, default: 0 },
    star: { type: Number, default: 0 },
    favorite_count: { type: Number, default: 0 },
  },
  prodThumbnail: { type: String, required: true },
  prodImages: [{ type: String }],
  prodQuantity: { type: Number, default: 1 },
  prodWeight: { type: Number, default: 500 },
  prodDiscount: {
    startDate: { type: Date, default: null },
    isDiscounted: { type: Boolean, default: false },
    discountPercent: { type: String, default: "0" },
  },
});
module.exports = mongoose.model("Products", Products);
