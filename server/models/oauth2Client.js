const mongoose = require("mongoose");

const oauth2ClientSchema = new mongoose.Schema({
  clientId: { type: String, required: true, index: { unique: true } },
  clientSecret: String,
});

// mongoose.methods.authenticate

module.exports = mongoose.model("OAUTH2Client", oauth2ClientSchema);
