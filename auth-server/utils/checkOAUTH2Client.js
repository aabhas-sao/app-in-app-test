const checkOAUTH2Client = (clients, client_id, client_secret, redirect_uri) => {
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];

    console.log("Testing checkOAUTH2Client");
    console.log(client.client_id, client_id);
    console.log(client.client_secret, client_secret);
    console.log(client.redirect_uri, redirect_uri);
    console.log("!!!");

    if (
      client.client_id === client_id &&
      client.client_secret === client_secret &&
      client.redirect_uri === redirect_uri
    ) {
      return true;
    }
  }

  return false;
};

module.exports = checkOAUTH2Client;
