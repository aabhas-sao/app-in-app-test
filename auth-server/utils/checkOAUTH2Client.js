const Oauth2Client = require("../models/oauth2Client");

const checkOAUTH2Client = async (client_id, client_secret, redirect_uri, clientDetails) => {
  try {
    const client = await Oauth2Client.findOne({ clientId: client_id }).exec();

    if (
      clientDetails.client_id === client_id &&
      client.clientId === client_id &&
      client.clientSecret === client_secret &&
      // checking for redirectURI validation is also a good security measure
      // Turned off here for debugging, in production could turn on this check as well
      // client.redirectURI === redirect_uri
    ) {
      return true;
    }

    return false;
  } catch (e) {
    console.log("error fetching client");
    return false;
  }
};

module.exports = checkOAUTH2Client;
