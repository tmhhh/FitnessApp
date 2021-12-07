const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const post = new Schema(
  {
    title: { type: String, required: true },
    hashtag: [{ type: String, default: null }],
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    thumbnail: { type: String },
    content: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    like: {
      count: { type: Number, default: 0 },
      user: [{ type: Schema.Types.ObjectId, ref: "Users", default: null }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", post);
