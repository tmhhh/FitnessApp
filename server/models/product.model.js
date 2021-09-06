const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Products = new Schema({
  prodName: { type: String, required: true },
  prodType: { type: String, required: true },
  prodDes: { type: String, required: true },
  prodPrice: { type: String, required: true },
  prodStar: { type: Number, default: 1 },
  prodImage: { type: String, required: true },
  prodQuan: { type: Number, default: 1 },
});
module.exports = mongoose.model("Products", Products);
