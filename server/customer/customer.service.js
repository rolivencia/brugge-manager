const environment = require("server/_helpers/environment");
const Customer = require("./customer.model");
const jwt = require("jsonwebtoken");

module.exports = { create, getAll, getById, getByEmail };

async function getById(id) {
  return Customer().findOne({ where: { id: id } });
}

async function getAll() {
  return Customer().findAll();
}

async function getByEmail(email) {
  return Customer().findOne({
    where: {
      email: email
    }
  });
}

// TODO: Agregar lógica requerida para lidiar con idDevice duplicados, a fin de evitar el fraude de utilizar varios chips gratuitos con distinto número en un mismo móvil.
async function create({ firstName, lastName, email, imageUrl, idDevice }) {
  const newCustomer = await Customer().findOrCreate({
    where: { email: email },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      idDevice: idDevice
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

// TODO: Implement remove and update
async function remove() {}
async function update() {}
