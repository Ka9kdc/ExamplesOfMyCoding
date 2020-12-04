const sequelize = require('sequelize');
const db = require('./db');

const CalendarEvent = db.define('calendarEvent', {
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
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
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
    validate: {
      notEmpty: true,
    },
  },
  Type: {
    type: sequelize.STRING,
    defaultValue: 'Other',
    validate: {
      isIn: [
        [
          'Net',
          'Club Meeting',
          'Special Event',
          'Public Service Event',
          'Training Class',
          'Testing',
          'CSU',
          'Other',
        ],
      ],
    },
  },
});

module.exports = CalendarEvent;
