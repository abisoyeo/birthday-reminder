const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 30],
        notNull: {
          msg: "Username is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address",
        },
        notNull: {
          msg: "Email is required",
        },
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: {
          msg: "Date of birth is required",
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        user.username = user.username.trim();
        user.email = user.email.trim().toLowerCase();
      },
      beforeUpdate: (user) => {
        user.username = user.username.trim();
        user.email = user.email.trim().toLowerCase();
      },
    },
  }
);

module.exports = User;
