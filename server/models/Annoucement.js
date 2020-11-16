const db = require('./db');
const sequelize = require('sequelize');

const Annoucement = db.define('annoucement', {
  borderColor: {
    type: sequelize.STRING,
    allowNull: false,
  },
  backgroundColor: {
    type: sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  PostDate: {
    type: sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Annoucement;
