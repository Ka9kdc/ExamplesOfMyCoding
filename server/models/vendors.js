const Sequelize = require("sequelize");
const db = require("./db")

const Vendor = db.define('vendor',{
    Name:{
        type: Sequelize.STRING,
    },
    Callsign: {
        type: Sequelize.STRING
    },
    Company: {
        type: Sequelize.STRING
    },
    Phone: {
        type: Sequelize.INTEGER
    },
    Street: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    City: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    State: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    Email: {
        type: Sequelize.STRING,
        isEmail: true,
        validate: {
            notEmpty: true,
        }
    },
    SpecialRequests:{
        type: Sequelize.TEXT
    },
    OrderDate: {
        type: Sequelize.DATE,
        validate: {
            notEmpty: true,
        }
    }
})

const Order = db.define('order', {
    Tickets:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Tables:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    Chairs:{
        type: Sequelize.INTEGER
    },
    Electical:{
        type: Sequelize.BOOLEAN,
        default: false
    },
    Raffle:{
        type: Sequelize.INTEGER
    },
    Amount:{
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
   OrderDate:{
    type: Sequelize.DATE,
    validate: {
        notEmpty: true,
    }
   }
})

module.exports = {
    Vendor,
    Order
}