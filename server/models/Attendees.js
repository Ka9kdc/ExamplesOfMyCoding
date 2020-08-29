const Sequelize = require("sequelize");
const db = require("./db")

const Attendee = db.define('attendee',{
    Name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Callsign: {
        type: Sequelize.STRING
    },
    Phone: {
        type: Sequelize.INTEGER
    },
    Street: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING,
        isEmail: true,
    },
    OrderDate: {
        type: Sequelize.DATE,
        validate: {
            notEmpty: true
        }
    }
})


const Ticket = db.define('ticket', {
    Tickets:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Raffle:{
        type: Sequelize.INTEGER
    },
    Amount:{
        type: Sequelize.DECIMAL,
        validate: {
            notEmpty: true
        }
    },
    OrderDate: {
        type: Sequelize.DATE,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = {
    Attendee,
    Ticket,
}