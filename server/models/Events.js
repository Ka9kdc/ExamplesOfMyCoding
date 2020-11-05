const sequelize = require('sequelize')
const db = require('./db')



const Event = db.define('event', {
    Name: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Start: {
        type: sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    End: {
        type: sequelize.DATE, 
    },
    Location: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Description: {
        type: sequelize.STRING,
    },
    Type: {
        type: sequelize.STRING
    }
})


module.exports = Event

