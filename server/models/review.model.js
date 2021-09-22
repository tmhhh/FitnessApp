const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    of_product: { type: Schema.Types.ObjectId, ref: "Products" },
    content: { type: String, required: true },
    like: {
      count: { type: Number, default: 0 },
      people: [{ type: Schema.Types.ObjectId, ref: "Users", default: null }],
    },
    rating: { type: Number, enum: Array.from(Array(5), (_, i) => i + 1) },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Reviews", Reviews);
