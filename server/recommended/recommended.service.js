const Recommended = require("./recommended.model");

module.exports = {
  create,
  update,
  remove,
  getAll
};

async function create({ title, description, imageUrl }) {
  return Recommended().create({
    title: title,
    description: description,
    imageUrl: imageUrl
  });
}

async function update({ id, title, description, imageUrl }) {
  return Recommended().update(
    {
      title: title,
      description: description,
      imageUrl: imageUrl
    },
    { where: { id: id } }
  );
}

async function remove({ id }) {
  return Recommended().update({ deleted: 1 }, { where: { id: id } });
}

async function getAll() {
  return Recommended().findAll({
    where: { enabled: 1, deleted: 0 },
    order: [["createdAt", "DESC"]]
  });
}
