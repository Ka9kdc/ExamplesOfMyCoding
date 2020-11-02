const Sequelize = require("sequelize");
const db = require("./db")

const OfficerHistory = db.define('officerHistory', {
    startYear: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    endYear: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    President: {
        type: Sequelize.STRING,
        allowNull: false
    },
    VicePresident: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Secretary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Treasurer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Custodian: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = OfficerHistory