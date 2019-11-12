const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

module.exports = () => CustomerCoupon;

const Coupon = require("../coupon/coupon.model");

class CustomerCoupon extends Sequelize.Model {}

CustomerCoupon.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    idCustomer: {
      type: Sequelize.INTEGER,
      primaryKey: false,
      allowNull: false,
      field: "id_customer",
      references: {
        model: "customer",
        key: "id"
      }
    },
    idCoupon: {
      type: Sequelize.INTEGER,
      primaryKey: false,
      allowNull: false,
      field: "id_coupon",
      references: {
        model: "coupon",
        key: "id"
      }
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
    modelName: "customer_coupon"
  }
);

CustomerCoupon.belongsTo(Coupon(), {
  foreignKey: "id_coupon",
  as: "coupon"
});
