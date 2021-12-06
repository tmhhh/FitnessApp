const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const service = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    vendor: { type: String },
    price: { type: Number },
    slot: { type: Number },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Services", service);
