const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const service = new Schema(
  {
    name: { type: String, required: true },
    vendor: { type: String },
    price: { type: Number },
    slot: { type: Number },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Services", service);
