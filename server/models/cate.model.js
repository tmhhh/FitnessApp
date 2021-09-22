const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cate = new Schema({
  cateName: { type: String, required: true },
  cateFilter: [
    {
      filterName: { type: String },
    },
  ],
});

module.exports = mongoose.model("Categories", Cate);
