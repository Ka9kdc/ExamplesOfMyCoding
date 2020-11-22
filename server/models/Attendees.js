const Sequelize = require('sequelize');
const db = require('./db');

const Attendee = db.define('attendee', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  Callsign: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
      is: /^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/,
      len: [3, 6],
    },
  },
  Phone: {
    type: Sequelize.STRING,
    validate: {
      is: /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i,
      len: [10, 17],
    },
  },
  Street: {
    type: Sequelize.STRING,
    validate: {
      not: /^[-!$%^&*()_+|~=`{}[:;<>?@#\]]/g,
    },
  },
  City: {
    type: Sequelize.STRING,
    validate: {
      not: /^[-!$%^&*()_+|~=`{}[:;<>?,@#\]]/g,
    },
  },
  State: {
    type: Sequelize.STRING,
    validate: {
      is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/,
    },
  },
  Zip: {
    type: Sequelize.INTEGER,
    validate: {
      is: /^\d{5}(-\d{4})?$/,
    },
  },
  Email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  OrderDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
  },
});

const Ticket = db.define('ticket', {
  Tickets: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
  Raffle: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  Amount: {
    type: Sequelize.INTEGER, //storing amount as pennies
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  OrderDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true,
    },
  },
});

module.exports = {
  Attendee,
  Ticket,
};
