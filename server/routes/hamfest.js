const express = require('express')
const { Product, Payment, Attendee, Order, Ticket, Vendor } = require("../models");

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        const products = await Product.findAll()
      res.send(store(products));
    } catch (error) {
        next(error)
    }
});

router.post('/attendee', async (req, res, next) =>{
    try {
        const attendee = await Attendee.create(req.body);
        const order = await Ticket.create({
            ...req.body, 
            attendeeId: attendee.id
            })
        const payment = await Payment.create({
            attendeeId: attendee.id,
            ticketId: order.id,
            Amount: req.body.Amount,
            PaymentDate: req.body.date
        })
        res.send(attendee, order, payment)
    } catch (error) {
        next(error)
    }
})
   
  
router.post('/vendor', async (req, res, next) =>{
    try {
        const vendor = await Vendor.create(req.body);
        const order = await Order.create({
            ...req.body, 
            vendorId: vendor.id
            })
        const payment = await Payment.create({
            vendorId: vendor.id,
            orderId: order.id,
            Amount: req.body.Amount,
            PaymentDate: req.body.date
        })
        res.send(vendor, order, payment)
    } catch (error) {
        next(error)
    }
})
   
module.exports = router