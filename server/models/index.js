const Sequelize = require('sequelize');

const db = require('./db');
const { Member, Badge, Committee } = require('./PassingTests/member');
const Payment = require('./payment');
const { Attendee, Ticket } = require('./DontNeedToWorriedAboutTestingYet/Attendees');
const { Vendor, Order } = require('./DontNeedToWorriedAboutTestingYet/vendors');
const Product = require('./DontNeedToWorriedAboutTestingYet/products');
const User = require('./PassingTests//User');
const OfficerHistory = require('./OfficerHistory');
const Annoucement = require('./PassingTests/Annoucement');
const CalendarEvent = require('./Events');

User.belongsTo(Member);
Member.hasOne(User);

Member.belongsToMany(Member, { as: 'Family', through: 'FamilyMember' });

Member.hasOne(Badge);
Badge.belongsTo(Member);

Member.hasOne(Committee);
Committee.belongsTo(Member);

Member.hasMany(Payment);
Payment.belongsTo(Member);

Attendee.hasOne(Payment);
Payment.belongsTo(Attendee);

Attendee.hasOne(Ticket);
Ticket.belongsTo(Attendee);

Ticket.hasOne(Payment);
Payment.belongsTo(Ticket);

Vendor.hasOne(Order);
Order.belongsTo(Vendor);

Vendor.hasOne(Payment);
Payment.belongsTo(Vendor);

Order.hasOne(Payment);
Payment.belongsTo(Order);

Annoucement.belongsTo(User);
User.hasMany(Annoucement);

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
  Annoucement,
  CalendarEvent,
};
