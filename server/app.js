const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));
//ROUTE
app.use("/api", require("./routes/index.route"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
