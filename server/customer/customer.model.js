const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

const Coupon = require("../coupon/coupon.model");
const CustomerCoupon = require("./customer-coupon.model");

class Customer extends Sequelize.Model {}

module.exports = () => Customer;

Customer.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "first_name"
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "last_name"
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      field: "email"
    },
    imageUrl: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      field: "image_url"
    },
    idDevice: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
      field: "id_device"
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "created_at"
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "updated_at"
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      field: "enabled",
      defaultValue: true
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      field: "deleted",
      defaultValue: false
    }
  },
  {
    sequelize: sequelizeConnector,
    modelName: "customer"
  }
);

// Mediante las dos llamadas siguientes, se define en Sequelize la relación N a M entre Customer y Coupon
Customer.belongsToMany(Coupon(), {
  through: CustomerCoupon(),
  foreignKey: "id_customer"
});

Coupon().belongsToMany(Customer, {
  through: CustomerCoupon(),
  foreignKey: "id_coupon"
});

CustomerCoupon().belongsTo(Customer, {
  foreignKey: "id_customer",
  as: "customer"
});
