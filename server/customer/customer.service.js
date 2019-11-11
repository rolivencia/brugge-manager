const environment = require("server/_helpers/environment");
const Customer = require("./customer.model");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = { create, getAll, getById };

async function getById(id) {
  return Customer().findOne({ where: { id: id } });
}

async function getAll() {
  return Customer().findAll();
}

async function create({ firstName, lastName, email, imageUrl, uidFirebase }) {
  const newCustomer = await Customer().findOrCreate({
    where: Sequelize.or(
      {
        uidFirebase: uidFirebase
      },
      { email: email }
    ),
    defaults: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      uidFirebase: uidFirebase
    }
  });

  return new Promise((resolve, reject) => {
    const [customerData, isNewRecord] = newCustomer;
    customerData.dataValues
      ? resolve({
          ...customerData.dataValues,
          created: isNewRecord,
          token: jwt.sign(
            { sub: customerData.dataValues.id },
            environment.serverConfig.secret
          )
        })
      : reject({});
  });
}

async function remove() {}
async function update() {}
