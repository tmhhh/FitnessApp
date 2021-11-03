const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
        required: false,
      },
    ],
    of_comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      required: false,
    },
    of_post: { type: Schema.Types.ObjectId, ref: "Posts" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comments", comment);
