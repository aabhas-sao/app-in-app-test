const express = require("express");
const app = express();
const axios = require("axios");
const User = require("./models/user");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

const redis = {

}

app.get("/oauth2/callback", (req, res) => {
  const data = await axios.post(TOKEN_URL, {
    client_id,
    client_secret: process.env.CLIENT_SECRET,
    code,
    grant_type: 'acces_token',
    redirect_uri: ''
  })

  // got access token
  // login user and store acces_token somewhere safe
  // set a session cookie on user's browser

});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
