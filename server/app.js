const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ROUTE
app.use("/api", require("./routes/index.route"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
