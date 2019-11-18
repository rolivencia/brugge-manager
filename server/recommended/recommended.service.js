const Recommended = require("./recommended.model");

module.exports = {
  create,
  update,
  remove,
  getAll
};

const generateRecommendation = rawRecommendation => {
  return {
    id: rawRecommendation.id,
    title: rawRecommendation.title,
    description: rawRecommendation.description,
    imageUrl: rawRecommendation.imageUrl,
    audit: {
      createdAt: rawRecommendation.createdAt,
      updatedAt: rawRecommendation.updatedAt,
      enabled: rawRecommendation.enabled,
      deleted: rawRecommendation.deleted
    }
  };
};

async function create({ title, description, imageUrl }) {
  const recommendation = await Recommended().create({
    title: title,
    description: description,
    imageUrl: imageUrl
  });

  return new Promise((resolve, reject) => {
    if (recommendation) {
      resolve(generateRecommendation(recommendation));
    } else {
      reject(error);
    }
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

async function remove(id) {
  return Recommended().update({ deleted: 1 }, { where: { id: id } });
}

async function getAll() {
  const recommendations = await Recommended().findAll({
    where: { enabled: 1, deleted: 0 },
    order: [["createdAt", "DESC"]]
  });

  return new Promise((resolve, reject) => {
    if (recommendations) {
      resolve(
        recommendations.map(recommendation =>
          generateRecommendation(recommendation)
        )
      );
    } else {
      reject(error);
    }
  });
}
