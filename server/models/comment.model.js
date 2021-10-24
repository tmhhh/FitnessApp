const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String },
    replies: [
      {
        author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        content: { type: String },
      },
    ],
    of_post: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comments", comment);
