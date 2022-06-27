const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  profileUrl: String,
});

module.exports = mongoose.model("User", userSchema);
