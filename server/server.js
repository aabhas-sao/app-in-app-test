const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./db.js");
const User = require("./models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/auth/oauth2/authorize", (req, res) => {
  const { response_type, client_id, redirect_uri } = req.body;
  let code = "DUMMY123";
  res.redirect(redirect_uri + `?code=${code}`);
});

app.post("/auth/oauth2/token", (req, res) => {
  const { grant_type, client_id, client_secret, code, redirect_uri } = req.body;
});

app.get("/userinfo", (req, res) => {});

app.post("/auth/register", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const hash = await argon2.hash(password);

  let user;
  const oldUser = await User.findOne({ email }).exec();
  if (oldUser) {
    return res
      .status(403)
      .json({ message: `A user account with ${email} already exists` });
  }
  try {
    user = await User.create({
      email,
      firstName: first_name,
      lastName: last_name,
      hash,
    });
  } catch (e) {
    return res.sendStatus(500).json({
      message: "Internal server error. Failed to register a new user",
    });
  }

  user.code = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  res.sendStatus(200).send(user);
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  console.log(user);

  if (user) {
    const isAuthenticated = await argon2.verify(user.hash, password);

    if (isAuthenticated) {
      res.sendStatus(200).json(user);
    }
  }

  res.sendStatus(403);
});

// app.get('auth/signup', (req, res) => {

// })

// app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
