const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const router = require("./routes/index.route");
const nodemailer = require("./utils/nodemailer");
require("dotenv").config();

app.set("trust proxy", 1); // trust first proxy
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "none" },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://hht-fitness-app.netlify.app"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use(passport.initialize());
app.use(passport.session());
app.get("/testSendmail", async (req, res) => {
  console.log("asd");
  await nodemailer.testSendMail();
  return res.json("Success");
});
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//ROUTE
app.use("/api", require("./routes/index.route"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
