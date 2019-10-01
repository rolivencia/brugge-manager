const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

module.exports = () => CustomerCoupon;

class CustomerCoupon extends Sequelize.Model {}

CustomerCoupon.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
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
    modelName: "customer_coupon"
  }
);
