const Sequelize = require('sequelize')

const db = require('./db')
const {Member, Badge , Committee} = require("./member")
const Payment = require('./payment')
const { Attendee, Ticket } = require('./Attendees')
const { Vendor, Order } = require('./vendors')
const Product = require('./products')


Member.hasOne(Badge)
Badge.belongsTo(Member)

Member.hasOne(Committee)
Committee.belongsTo(Member)

Member.hasMany(Payment)
Payment.belongsTo(Member)

Payment.belongsTo(Attendee)
Attendee.hasOne(Payment)

Attendee.hasOne(Ticket)
Ticket.belongsTo(Attendee)

Payment.belongsTo(Ticket)
Ticket.hasOne(Payment)

Vendor.hasOne(Order)
Order.belongsTo(Vendor)

Vendor.hasOne(Payment)
Payment.belongsTo(Vendor)

Order.hasOne(Payment)
Payment.belongsTo(Order)

module.exports = {
    db,
    Member,
    Committee,
    Badge,
    Payment,
    Attendee,
    Vendor,
    Ticket,
    Order,
    Product
}