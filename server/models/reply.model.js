const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reply = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String },
    of_comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Replies", reply);
