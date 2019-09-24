const environment = require("./environment");
const Sequelize = require("sequelize");

const mysql = require("mysql2");
const database = environment.serverConfig.databases.mysql.databases
  .filter(db => db.id === "brugge")
  .pop();

const mySqlConnection = mysql.createConnection({
  host: database.host,
  user: database.user,
  database: database.database,
  password: database.password
});

const sequelizeConnection = new Sequelize(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
    define: {
      freezeTableName: true,
      timestamps: true
    }
  }
);

module.exports = { mysqlConnector, sequelizeConnector };

function mysqlConnector() {
  return mySqlConnection;
}

function sequelizeConnector() {
  return sequelizeConnection;
}
