const db = require('./db');
const sequelize = require('sequelize');

const Annoucement = db.define('annoucement', {
  borderColor: {
    type: sequelize.STRING(9),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^#[0-9a-fA-F]{3,8}$/,
      len: [4, 7, 9],
    },
  },
  backgroundColor: {
    type: sequelize.STRING(9),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^#[0-9a-fA-F]{3,8}$/,
      len: [4, 7, 9],
    },
  },
  message: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  PostDate: {
    type: sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true,
    },
  },
});

module.exports = Annoucement;
