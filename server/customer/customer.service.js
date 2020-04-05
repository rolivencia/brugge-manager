const environment = require("server/_helpers/environment");
const Customer = require("./customer.model");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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

  if (customer && idDevice) {
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
          id: customer.dataValues.id,
          firstName: customer.dataValues.firstName,
          lastName: customer.dataValues.lastName,
          email: customer.dataValues.email,
          idDevice: customer.dataValues.idDevice,
          audit: {
            createdAt: customer.dataValues.createdAt,
            updatedAt: customer.dataValues.updatedAt,
            enabled: customer.dataValues.enabled,
            deleted: customer.dataValues.deleted
          },

          created: false,
          message: "Cliente ingresado correctamente.",
          token: jwt.sign(
            { sub: customer.dataValues.id },
            environment.serverConfig.secret
          )
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
  // Se busca si existe un registro habilitado que tenga el mismo Device ID recibido como argumento.
  // Se busca cuál es la creación del registro más reciente que corresponda a este Device ID.

  const existingDevice = await Customer().findOne({
    where: { idDevice: idDevice, enabled: true, deleted: false },
    order: [["createdAt", "DESC"]]
  });

  let deviceEnabledForRegister = true;

  // Si el dispositivo existe como registrado, se calcula una ventana de tiempo respecto de la cual
  // se permite o no el registro del cliente con un Device ID ya existente.

  // El registro que contiene el Device ID anterior no se altera, dado que se considera un registro
  // anterior válido.

  if (existingDevice) {
    const timeWindow = { amount: 2, unit: "month" };
    const lastUpdate = moment(existingDevice.createdAt);
    const today = moment();

    if (today.isBefore(lastUpdate.add(timeWindow.amount, timeWindow.unit))) {
      deviceEnabledForRegister = false;
    }
  }

  // Procedemos a crear un nuevo registro. El nuevo registro se crea como habilitado o no dependiendo
  // de las condiciones del procedimiento de la sección anterior.
  // En todos los casos se crea un nuevo registro, pero depende del último registro del Device ID
  // determinar si el nuevo registro se crea como habilitado o no.

  const [customer, isNewCustomer] = await Customer().findOrCreate({
    where: { email: email },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      idDevice: idDevice ? idDevice : "",
      enabled: deviceEnabledForRegister
    }
  });

  return new Promise((resolve, reject) => {
    customer.dataValues && isNewCustomer && deviceEnabledForRegister
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
          message: !isNewCustomer
            ? "El cliente ya se encuentra registrado"
            : deviceEnabledForRegister
            ? "Ha ocurrido un error. Intente nuevamente"
            : "Usuario deshabilitado por múltiple registro en un mismo dispositivo. Ingrese con su usuario original."
        });
  });
}

// TODO: Implement remove and update
async function remove() {}
async function update() {}
