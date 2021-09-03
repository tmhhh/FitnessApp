const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userNameID: { type: String, required: true },
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  userImage: { type: String, required: true },
});

module.exports = mongoose.model("Users", Users);
