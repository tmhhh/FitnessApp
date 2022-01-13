const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    status: { type: String, default: "Pending" }, // pending,approved,done
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    price: {
      totalPrice: { type: Number, required: true },
      subTotal: { type: Number, required: true },
      shippingFee: { type: Number, required: true },
      discount: { type: Number, required: true },
    },
    listItems: [
      {
        prodDiscount: { type: Number, default: null },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },

        quantity: { type: Number, required: true },
        _id: false,
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
    payment: {
      isApproved: { type: Boolean, default: false },
      method: {
        type: String,
        required: true,
      },
      id: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", Bill);
