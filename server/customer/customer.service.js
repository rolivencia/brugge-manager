const environment = require("server/_helpers/environment");
const Customer = require("./customer.model");
const jwt = require("jsonwebtoken");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = { create, getAll, getById, getByEmail, login };

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

async function login(email, idDevice) {
  const customer = await Customer().findOne({
    where: {
      email: email
    }
  });

  if (customer) {
    await Customer().update(
      { idDevice: idDevice },
      {
        where: {
          email: email,
          [Op.or]: [{ idDevice: { [Op.eq]: null } }, { idDevice: "" }]
        }
      }
    );
  }

  return new Promise((resolve, reject) => {
    customer && customer.enabled && !customer.deleted
      ? resolve({
          ...customer.dataValues,
          created: false,
          message: "Cliente ingresado correctamente.",
          token: jwt.sign({ sub: customer.id }, environment.serverConfig.secret)
        })
      : reject({
          message:
            !customer.enabled || customer.deleted
              ? "Usuario bloqueado por mal uso. Contáctese con BRUGGE."
              : "Hubo un problema. Intente nuevamente."
        });
  });
}

// TODO: Agregar lógica requerida para lidiar con idDevice duplicados, a fin de evitar el fraude de utilizar varios chips gratuitos con distinto número en un mismo móvil.
async function create({ firstName, lastName, email, imageUrl, idDevice }) {
  const existingDevice = await Customer().findOne({
    where: { idDevice: idDevice, enabled: true, deleted: false },
    order: [["createdAt", "DESC"]]
  });

  let deviceEnabledForRegister = true;

  // En caso de que ya exista el dispositivo desde el que se intenta registrar, se busca cuál es la creación
  // de un registro más reciente que corresponda al Device ID del dispositivo
  if (existingDevice) {
    const timeWindow = { amount: 2, unit: "month" };
    const lastUpdate = moment(existingDevice.createdAt);
    const today = moment();

    if (today.isBefore(lastUpdate.add(timeWindow.amount, timeWindow.unit))) {
      deviceEnabledForRegister = false;
    }
  }

  // Creación de un nuevo registro
  const customer = await Customer().create({
    where: { email: email },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      idDevice: idDevice,
      enabled: deviceEnabledForRegister
    }
  });

  return new Promise((resolve, reject) => {
    customer.dataValues && deviceEnabledForRegister
      ? resolve({
          ...customer.dataValues,
          created: true,
          message: "Cliente registrado correctamente.",
          token: jwt.sign(
            { sub: customer.dataValues.id },
            environment.serverConfig.secret
          )
        })
      : reject({
          message: deviceEnabledForRegister
            ? "Ha ocurrido un error. Intente nuevamente"
            : "Usuario deshabilitado por doble registro en un mismo dispositivo."
        });
  });
}

// TODO: Implement remove and update
async function remove() {}
async function update() {}
