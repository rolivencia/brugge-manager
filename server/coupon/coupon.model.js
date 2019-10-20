const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

class Coupon extends Sequelize.Model {}

module.exports = () => Coupon;

Coupon.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      field: "title"
    },
    startsAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "starts_at"
    },
    endsAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "ends_at"
    },
    description: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
      field: "description"
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      field: "code"
    },
    imageUrl: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      field: "image_url"
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "created_at"
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "updated_at"
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: "enabled"
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: "deleted"
    },
    idUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "id_user"
    },
    idType: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "id_type"
    }
  },
  {
    sequelize: sequelizeConnector,
    modelName: "coupon"
  }
);
