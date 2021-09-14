const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Voucher = new Schema({
  vouQuantity: { type: Number, required: true },
  vouExpired: { type: Date, required: true },
  vouCode: { type: String, required: true },
  vouDiscount: { type: Number, required: true },
  cateID: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
});
module.exports = mongoose.model("Voucher", Voucher);
