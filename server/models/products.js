const Sequelize = require('sequelize');
const db = require('./db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  onSale: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  photo: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
