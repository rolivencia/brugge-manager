const environment = require("server/_helpers/environment");
const Customer = require("./customer.model");

module.exports = { create, getAll, getById };

async function getById(id) {
  return Customer().findOne({ where: { id: id } });
}

async function getAll() {
  return Customer().findAll();
}

async function create({ firstName, lastName, email, uidFirebase }) {
  const newCustomer = await Customer()
    .findOrCreate({
      where: { uidFirebase: uidFirebase },
      defaults: { firstName: firstName, lastName: lastName, email: email }
    })
    .then(([customer, created]) => {
      console.log(customer.get({ plain: true }));
      console.log(created);
    });
}

async function remove() {}
async function update() {}
