const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database/database");

class User extends Model {}

// PERSON ELLER USER HAR / KAN VÄLJA BARA ETT HUS / SMAK
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

// HOUSE / SMAKER HAR MÅNGA PERSONER / USER
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

Smaker.hasMany(User);
User.belongsTo(Smaker);

module.exports = { User, Smaker };
