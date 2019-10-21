const expressJwt = require("express-jwt");
const environment = require("./environment");

module.exports = jwt;

function jwt() {
  const { secret } = environment.serverConfig;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/backend",
      "/customer/create",
      "/api/keys/get"
    ]
  });
}
