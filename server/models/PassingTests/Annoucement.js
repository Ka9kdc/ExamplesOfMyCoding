const db = require('../db');
const sequelize = require('sequelize');

//Done for now passing all tests

const Annoucement = db.define('annoucement', {
  borderColor: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  backgroundColor: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  message: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  PostDate: {
    type: sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Annoucement;
