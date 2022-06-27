const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercises = new Schema({
  name: { type: String, require: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  muscleActivate: [{ type: String, required: true }],
  videoURL: { type: String, required: true },
  calories: { type: Number, default: 150 },
});

module.exports = mongoose.model("Exercises", Exercises);
