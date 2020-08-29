const Sequelize = require("sequelize");


const db = new Sequelize("postgres://localhost:5432/WCRA", {
  logging: false
});


module.exports = db