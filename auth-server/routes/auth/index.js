const router = require("express").Router();
const User = require("../../models/user");
const authenticate = require("../../utils/authenticate");

const LOGIN_URI = "http://localhost:3001";

router.get("/oauth2/authorize", (req, res) => {
  const { response_type, client_id, redirect_uri } = req.query;

  res.redirect(
    `${LOGIN_URI}/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`
  );
});

router.post("/oauth2/token", (req, res) => {
  const { grant_type, client_id, client_secret, code, redirect_uri } = req.body;
});

router.post("/register", async (req, res) => {
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

  const { firstName, lastName } = user;
  const data = {
    email,
    firstName,
    lastName,
  };

  res.status(200).json(data);
});

router.post("/login", async (req, res) => {
  const { client_id, response_type, redirect_uri } = req.query;

  const isAuthenticated = authenticate(email, password);

  if (isAuthenticated === EMAIL_NOT_FOUND) {
    res.status(403).json({ message: "email not found" });
  }

  if (client_id && response_type && redirect_uri) {
    if (response_type === "code") {
      let code = "DUMMYCODE123";

      if (isAuthenticated === SUCCESS) {
        return res.redirect(
          `${redirect_uri}?code=${code}&client_id=${client_id}`
        );
      }

      return res.status(401).json({ message: "invalid credentials" });
    }
  }

  isAuthenticated === SUCCESS
    ? res.status(200).json(user)
    : res.sendStatus(403);
});

module.exports = router;
