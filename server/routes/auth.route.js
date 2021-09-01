const express = require("express");
const route = express.Router();
route.post("/login", (req, res) => {
  res.json(req.body.user);
});
module.exports = route;
