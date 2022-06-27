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
      isSelected: { type: Boolean, default: true },
      isOrdered: { type: Boolean, default: false },
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
  userEmail: { type: String, default: null },
  userPhone: { type: String, default: "0" },
  favoriteProducts: [
    { type: Schema.Types.ObjectId, ref: "Products", default: null },
  ],
  trackingInfo: {
    isFilled: { type: Boolean, default: false },
    userHeight: { type: Number, default: null },
    userAge: { type: Number, default: null },
    userGender: { type: Number, default: null },
    userWeight: { type: Number, default: null },
    userGoal: { type: Number, default: null },
    userActivityLevel: { type: String, default: null },
    trackingFood: [
      {
        goalKCAL: { type: Number, default: 0 },
        addedDate: { type: String, default: new Date().toLocaleDateString() },
        listFoods: [
          {
            _id: false,
            id: { type: String, default: null },
            mealType: { type: Number, default: null },
            foodName: { type: String, default: null },
            foodServing: { type: String, default: null },
            foodKCAL: { type: String, default: null },
          },
        ],
      },
    ],
  },
  workoutSchedule: [
    {
      _id: false,
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercises",
        default: null,
      },
      createdDate: { type: String, default: new Date().toLocaleDateString() },
    },
  ],
});

module.exports = mongoose.model("Users", Users);
