const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userNameID: { type: String, required: true },
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  userImage: { type: String, default: null },
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
});

module.exports = mongoose.model("Users", Users);
