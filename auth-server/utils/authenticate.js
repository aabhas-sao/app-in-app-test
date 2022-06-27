const User = require("../models/user");

const authenticate = async (email, password) => {
  const user = await User.findOne({ email }).exec();

  if (user) {
    const isAuthenticated = await argon2.verify(user.hash, password);

    if (isAuthenticated) {
      return SUCCESS;
    }

    return INCORRECT_PASSWORD;
  }

  return EMAIL_NOT_FOUND;
};

module.exports = authenticate;
