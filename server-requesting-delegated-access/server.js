const express = require("express");
const app = express();
const axios = require("axios");

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

});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
