const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database/database");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    chosenIcecream: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
  }
);

class Smaker extends Model {}

Smaker.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Smaker",
    timestamps: false,
  }
);

Smaker.hasMany(User, { as: "user" });
User.belongsTo(Smaker, { as: "icecream" });

module.exports = { User, Smaker };
