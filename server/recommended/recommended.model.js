const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

class Recommended extends Sequelize.Model {}

module.exports = () => Recommended;

Recommended.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "title"
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: "description"
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "image_url"
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "created_at"
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: "updated_at"
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      field: "enabled"
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: "deleted"
    }
  },
  {
    sequelize: sequelizeConnector,
    modelName: "recommended"
  }
);
