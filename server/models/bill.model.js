const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    price: {
      totalPrice: { type: Number, required: true },
      subTotal: { type: Number, required: true },
      shippingFee: { type: Number, required: true },
      discount: { type: Number, required: true },
    },
    listItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },

        quantity: { type: Number, required: true },
      },
    ],
    discountUsed: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
      default: null,
    },
    shippingAddress: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },
    phoneNumber: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", Bill);