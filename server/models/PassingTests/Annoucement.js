const db = require('../db');
const sequelize = require('sequelize');

//Done for now passing all tests

const Annoucement = db.define('annoucement', {
  borderColor: {
    type: sequelize.STRING(9),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^#[0-9a-fA-F]{3,8}$/
    }
  },
  backgroundColor: {
    type: sequelize.STRING(9),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^#[0-9a-fA-F]{3,8}$/
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
      isDate: true,  
      notEmpty: true
    }
  },
});

module.exports = Annoucement;
