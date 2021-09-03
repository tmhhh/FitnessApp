const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userID: String,
  userName: String,
  userPassword: String,
});

module.exports = mongoose.model("Users", Users);
