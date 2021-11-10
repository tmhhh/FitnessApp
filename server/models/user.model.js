const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userNameID: { type: String, required: true },
  userName: { type: String, required: true },
  userPassword: { type: String, default: null },
  userImage: { type: String, default: null },
  userType: { type: Number, default: 0 },
  userCart: [
    {
      _id: false,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        default: null,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  userWishlist: {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        default: null,
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services",
        default: null,
      },
    ],
  },
});

module.exports = mongoose.model("Users", Users);
