const Sequelize = require('sequelize');
const db = require('../db');

const Payment = db.define('payment', {
  Amount: {
    type: Sequelize.INTEGER, //storing amount as pennies
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  PaymentDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true,
    },
  },
});

module.exports = Payment;
