const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceRegister = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    phone: { type: Number },
    email: { type: Number },
    service: { type: Schema.Types.ObjectId, ref: "Services", required: true },
    expired: { type: Number },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Service_registers", serviceRegister);
