const Sequelize = require('sequelize')

const db = require('./db')
const {Member, Badge , Committee} = require("./member")
const Payment = require('./payment')


Member.hasOne(Badge)
Badge.belongsTo(Member)

Member.hasOne(Committee)
Committee.belongsTo(Member)

Member.hasMany(Payment)
Payment.belongsTo(Member)


module.exports = {
    db,
    Member,
    Committee,
    Badge,
    Payment
}