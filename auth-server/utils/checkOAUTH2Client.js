/* eslint-disable camelcase */
const Oauth2Client = require("../models/oauth2Client");

const checkOAUTH2Client = async (
  client_id,
  client_secret,
  redirect_uri,
  clientDetailsCache
) => {
  try {
    const client = await Oauth2Client.findOne({ clientId: client_id }).exec();

    if (!client) {
      console.log("client not found")
      return false;
    }

    const checks = [
      client.clientId === client_id,
      client.clientSecret === client_secret,
      // client.redirectURI === redirect_uri,
      clientDetailsCache?.client_id === client_id
    ];

    console.log("Checks", checks)
    console.log(clientDetailsCache.client_id, client_id)

    if (!checks.includes(false)) {
      return true;
    }

    return false;
  } catch (e) {
    console.log("error fetching client");
    return false;
  }
};

module.exports = checkOAUTH2Client;
