const router = require("express").Router();
const User = require("../../models/user");
const authenticate = require("../../utils/authenticate");
const jwt = require("jsonwebtoken");
const checkOAUTH2Client = require("../../utils/checkOAUTH2Client");
const { SUCCESS, EMAIL_NOT_FOUND } = require("../../constants");
const argon2 = require("argon2");

const LOGIN_URI = process.env.LOGIN_URI;

// integrate redis for cache later
const redis = {};
const clients = [
  {
    client_id: "fasdlfdhsldfkdflss13jf",
    client_secret: "4283jdfasfdjdsj399",
    client_name: "Scenes",
    redirect_uri: process.env.REDIRECT_URI,
  },
];

router.get("/oauth2/authorize", (req, res) => {
  const { response_type, client_id, redirect_uri } = req.query;

  res.redirect(
    `${LOGIN_URI}/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`
  );
});

router.post("/oauth2/token", (req, res) => {
  const { grant_type, client_id, client_secret, code, redirect_uri } = req.body;

  // verify client_id and client_secret and code
  const isValidOAUTH2Client = checkOAUTH2Client(
    clients,
    client_id,
    client_secret,
    redirect_uri
  );

  console.log(isValidOAUTH2Client);
  console.log(redis[code]);

  if (client_id && redirect_uri) {
    console.log("client_id", redis[code]?.client_id === client_id, client_id);
    console.log(
      "redirect_uri",
      redis[code]?.redirect_uri === redirect_uri,
      redirect_uri
    );
    console.log("grant_type", grant_type === "authorization_code", grant_type);
  }

  if (
    isValidOAUTH2Client &&
    redis[code]?.client_id === client_id &&
    redis[code]?.redirect_uri === redirect_uri &&
    grant_type === "authorization_code"
  ) {
    // create an access token for the uid
    // send a response

    const { uid } = redis[code];
    token = jwt.sign({ userId: uid }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      access_token: token,
    });
  }

  res.status(403).json({ message: "invalid request" });
});

router.post("/register", async (req, res) => {
  const { response_type, client_id, redirect_uri } = req.query;
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

  const { firstName, lastName } = user;
  const data = {
    email,
    firstName,
    lastName,
  };

  if (redirect_uri && client_id && response_type === "code") {
    return res.redirect(
      `${LOGIN_URI}/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`
    );
  }

  res.status(200).json(data);
});

router.post("/login", async (req, res) => {
  const { client_id, response_type, redirect_uri } = req?.query;
  const { email, password } = req.body;

  const isAuthenticated = await authenticate(email, password);

  // console.log(isAuthenticated);
  const user = isAuthenticated.user;

  if (isAuthenticated.message === EMAIL_NOT_FOUND) {
    return res.status(403).json({ message: "email not found" });
  }

  if (client_id && response_type && redirect_uri) {
    if (response_type === "code") {
      let code = "DUMMYCODE123";

      // generate a unique code and store it in cache
      // code : {
      //    client_id: , the client id code is assigned to verify later
      //    email or uid,
      // }
      // use random uid generator later and redis
      redis[code] = {
        client_id,
        uid: user?._id,
        redirect_uri,
      };

      console.log("!!!!");
      console.log("login", redis[code]);

      if (isAuthenticated.message === SUCCESS) {
        return res.redirect(`${redirect_uri}?code=${code}`);
      }

      return res.status(401).json({ message: "invalid credentials" });
    }
  }

  isAuthenticated.message === SUCCESS
    ? res.status(200).json(user)
    : res.sendStatus(403);
});

module.exports = router;
