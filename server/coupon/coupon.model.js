const Sequelize = require("sequelize");
const connector = require("server/_helpers/mysql-connector");
const sequelizeConnector = connector.sequelizeConnector();

const CouponType = require("./coupon-type.model");
const User = require("../users/user.model");

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
    dailyCoupon: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false,
      field: "daily_coupon"
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
    },
    idUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "id_user",
      references: {
        model: "user",
        key: "id"
      }
    },
    idType: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "id_type",
      references: {
        model: "coupon_type",
        key: "id"
      }
    }
  },
  {
    sequelize: sequelizeConnector,
    modelName: "coupon"
  }
);

Coupon.belongsTo(CouponType(), {
  foreignKey: "id_type",
  as: "type"
});

Coupon.belongsTo(User(), {
  foreignKey: "id_user",
  as: "user"
});
