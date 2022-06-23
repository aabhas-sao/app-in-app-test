import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import user from "./db.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3000;

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

app.get('/', (req, res) => {
  res.send('hello')
})

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    console.log('hey')
    return res.sendStatus(200)
  }

  res.sendStatus(403);
})

// app.get('auth/signup', (req, res) => {

// })

// app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`server running on ${PORT}`))