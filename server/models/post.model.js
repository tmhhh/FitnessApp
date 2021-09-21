const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const post = new Schema(
  {
    title: { type: String, required: true },
    hashtag: [{ type: String, default: null }],
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    thumbnail: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", post);
