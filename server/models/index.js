const Sequelize = require('sequelize')

const db = require('./db')
const {Member, Badge , Committee} = require("./member")
const Payment = require('./payment')
const { Attendee, Ticket } = require('./Attendees')
const { Vendor, Order } = require('./vendors')
const Product = require('./products')
const User = require('./User')
const OfficerHistory = require('./OfficerHistory')
const Event = require('./Events')

User.belongsTo(Member)
Member.hasOne(User)

Member.belongsToMany(Member, {as: 'Family', through: 'FamilyMember'})

Member.hasOne(Badge)
Badge.belongsTo(Member)

Member.hasOne(Committee)
Committee.belongsTo(Member)

Member.hasMany(Payment)
Payment.belongsTo(Member)


Attendee.hasOne(Payment)
Payment.belongsTo(Attendee)

Attendee.hasOne(Ticket)
Ticket.belongsTo(Attendee)

Ticket.hasOne(Payment)
Payment.belongsTo(Ticket)

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
    Product, 
    User,
    OfficerHistory,
    Event
}