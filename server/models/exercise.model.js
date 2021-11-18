const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercise = new Schema({
  name: { type: String, require: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  muscleActivate: [{ type: String, required: true }],
  videoURL: { type: String, required: true },
});

module.exports = mongoose.model("Exercise", Exercise);
