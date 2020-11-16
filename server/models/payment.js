const Sequelize = require('sequelize');
const db = require('./db');

const Payment = db.define('payment', {
  Amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  PaymentDate: {
    type: Sequelize.DATE,
  },
});

module.exports = Payment;
