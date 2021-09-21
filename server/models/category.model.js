const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = new Schema({
  name: { type: String, required: true },
  filter: [{ type: String }],
});
module.exports = mongoose.model("Categories", Category);
