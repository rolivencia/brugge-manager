const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

class CouponType extends Sequelize.Model {}

module.exports = () => CouponType;

CouponType.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: "id"
    },
    description: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      field: "description"
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
    }
  },
  {
    sequelize: sequelizeConnector,
    modelName: "coupon_type"
  }
);
