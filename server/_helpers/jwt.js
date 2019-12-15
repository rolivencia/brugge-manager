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
      "/customer/getByEmail",
      "/api/keys/get",
      new RegExp("/customer/getByEmail/*", "i"),
      new RegExp("/recommended/get/*/*", "i")
    ]
  });
}
