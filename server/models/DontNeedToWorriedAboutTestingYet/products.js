const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dataName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER, //storing amount as pennies
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  onSale: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  photo: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
