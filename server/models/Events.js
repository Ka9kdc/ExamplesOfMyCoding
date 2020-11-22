const sequelize = require('sequelize');
const db = require('./db');

const CalendarEvent = db.define('calenderEvent', {
  Name: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Start: {
    type: sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
  },
  End: {
    type: sequelize.DATE,
  },
  Location: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Description: {
    type: sequelize.STRING,
  },
  Type: {
    type: sequelize.ENUM(
      'Net',
      'Club Meeting',
      'Special Event',
      'Public Service Event',
      'Training Class',
      'Testing',
      'CSU'
    ),
  },
});

module.exports = CalendarEvent;
