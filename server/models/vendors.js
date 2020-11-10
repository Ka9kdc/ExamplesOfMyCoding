const Sequelize = require("sequelize");
const db = require("./db")

const Vendor = db.define('vendor',{
    Name:{
        type: Sequelize.STRING,
        validate: {
            isAlpha: true
        }
    },
    Callsign: {
        type: Sequelize.STRING,
        validate: {
            isAlphanumeric: true,
            is: /^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/
        }
    },
    Company: {
        type: Sequelize.STRING,
        validate:{
            not: /^[!$%^*()_+|~={}[:;<>?@#\]]/g
        }
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i,
        }
    },
    Street: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            not: /^[-!$%^&*()_+|~=`{}[:;<>?@#\]]/g
        }
    },
    City: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            not: /^[-!$%^&*()_+|~=`{}[:;<>?,@#\]]/g
        }
    },
    State: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
        }
    },
    Zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true,
            is: /^\d{5}(-\d{4})?$/
        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
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
            min: 1
        }
    },
    Tables:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 1
        }
    },
    Chairs:{
        type: Sequelize.INTEGER
    },
    Electical:{
        type: Sequelize.BOOLEAN,
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