const express = require('express');

const {
  Product,
  Payment,
  Attendee,
  Order,
  Ticket,
  Vendor,
  CalendarEvent,
} = require('../models');
const sequelize = require('sequelize');

const Op = sequelize.Op;
const router = express.Router();

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.post('/attendee/information', async (req, res, next) => {
  try {
    const attendee = await Attendee.create({
      Name: req.body.Name,
      Email: req.body.Email,
      Callsign: req.body.Callsign,
      Phone: req.body.Phone,
      Street: req.body.Street,
      City: req.body.City,
      State: req.body.State,
      Zip: req.body.Zip,
      OrderDate: req.body.order.orderDate,
    });
    attendee.setTicket(req.body.order.ticketId);

    res.send(attendee);
  } catch (error) {
    next(error);
  }
});

router.post('/attendee/order', async (req, res, next) => {
  try {
    let orderDate = new Date();

    const order = await Ticket.create({
      Tickets: req.body.Tickets,
      Raffle: req.body.Raffle,
      Amount: req.body.Amount,
      OrderDate: orderDate,
    });

    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/vendor/all', async (req, res, next) => {
  try {
    const hamfestDate = await CalendarEvent.findAll({
      where: { Name: 'Hamfest' },
      order: [['Start', 'ASC']],
      limit: 1,
    });
    const periodStart = new Date(
      hamfestDate[0].End.setFullYear(hamfestDate[0].End.getFullYear() - 1)
    );
    const periodEnd = hamfestDate[0].Start;
    const vendors = await Vendor.findAll({
      where: {
        OrderDate: {
          [Op.between]: [periodStart, periodEnd],
        },
      },
      attributes: ['Company', 'Name'],
    });
    res.send(vendors);
  } catch (error) {
    next(error);
  }
});

router.post('/vendor/information', async (req, res, next) => {
  try {
    const vendor = await Vendor.create({
      Name: req.body.Name,
      Company: req.body.Company,
      Email: req.body.Email,
      Callsign: req.body.Callsign,
      Phone: req.body.Phone,
      Street: req.body.Street,
      City: req.body.City,
      State: req.body.State,
      Zip: req.body.Zip,
      SpecialRequests: req.body.SpecialRequests,
      OrderDate: req.body.order.orderDate,
    });
    vendor.setOrder(req.body.order.orderId);

    res.send(vendor);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/vendor/order', async (req, res, next) => {
  try {
    let orderDate = new Date();

    const order = await Order.create({
      Tickets: req.body.Tickets,
      Tables: req.body.Tables,
      Chairs: req.body.Chairs,
      Electrical: req.body.Electrical,
      Raffle: req.body.Raffle,
      Amount: req.body.Amount,
      OrderDate: orderDate,
    });
    // req.session.order = order
    res.send(order);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/payment', async (req, res, next) => {
  try {
    let payment;
    if (req.body.ticketId) {
      payment = await Payment.create({
        attendeeId: req.body.id,
        ticketId: req.body.ticketId,
        Amount: req.body.order.Amount,
        PaymentDate: req.body.orderDate,
      });
    } else {
      payment = await Payment.create({
        vendorId: req.body.id,
        orderId: req.body.orderId,
        Amount: req.body.order.Amount,
        PaymentDate: req.body.orderDate,
      });
    }
    res.send(payment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
