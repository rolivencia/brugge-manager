require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("server/_helpers/jwt");
const errorHandler = require("server/_helpers/error-handler");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
app.use(errorHandler);

// Serve only the static files form the dist directory
app.use(express.static("./dist"));

const rutasAccesibles = [
  "/",
  "/dashboard",
  "/login",
  "/home",
  "/dashboard/mobile",
  "dashboard/mobile/redeem-coupon"
];
const rutasApi = [
  { path: "/users", controller: "./server/users/users.controller" },
  { path: "/customer", controller: "./server/customer/customer.controller" },
  { path: "/coupon", controller: "./server/coupon/coupon.controller" },
  { path: "/api/keys", controller: "./server/keys/keys.controller" },
  { path: "/upload", controller: "./server/_helpers/cloudcube-connector" }
];

app.get(rutasAccesibles, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// use JWT auth to secure the api
app.use(jwt());

// api routes
for (const ruta of rutasApi) {
  app.use(ruta.path, require(ruta.controller));
}

// Start the app by listening on the default Heroku port
const port = process.env.PORT ? process.env.PORT : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
