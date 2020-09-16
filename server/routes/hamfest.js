const express = require('express')
const { Product, Payment, Attendee, Order, Ticket, Vendor } = require("../models");

const router = express.Router()

const tempProd = [
    { name: 'Advanced Tickets',
      dataName: 'Tickets',
      price: 8,
      onSale: true,
      description: 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.',
photo: '/Images/f89b7cbe4e61a04129304e6ce498afb2.png',
id:4},
   
    {name: "Table",
        dataName: "Tables",
      description: '8 foot by 4 foot folding table.',
      price: 25,
      onSale: true,
      photo: '/Images/download.jpeg',
      id:3},
       {name: "Extra chair",
      dataName: "Chairs",
      description: 'a metal folding chair. One chair is provided with each Vendor request.',
      price: 2,
      onSale: false,
      photo: '/Images/folding-chair-garden-furniture-stainless-steel-chair.jpg',
    id:1},
    {name: "Electrical",
    dataName: "Electrical",
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '/Images/electricOutlet.png',
      id:2}
     
  ];

router.get("/products", async (req, res, next) => {
    try{
        const products = await Product.findAll()
      res.send(tempProd);
    } catch (error) {
        next(error)
    }
});

router.post('/attendee/information', async (req, res, next) =>{
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
            OrderDate: req.body.order.orderDate
        })
        attendee.setTicket(req.body.order.ticketId)

        res.send(attendee)
    } catch (error) {
        next(error)
    }
})

router.post('/attendee/order', async (req, res, next) =>{
    try {
        let orderDate = new Date()
  
        const order = await Ticket.create({
            Tickets: req.body.Tickets,
            Raffle: req.body.Raffle,
            Amount: req.body.Amount,
            OrderDate: orderDate
        });

        res.send(order)
    } catch (error) {
        next(error)
    }
})
   
  
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
            OrderDate: req.body.order.orderDate
        })
        vendor.setOrder(req.body.order.orderId)

        res.send(vendor)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/vendor/order', async (req, res, next) => {
    try {
        let orderDate = new Date()
  
        const order = await Order.create({
            Tickets: req.body.Tickets,
            Tables: req.body.Tables,
            Chairs: req.body.Chairs,
            Electrical: req.body.Electrical,
            Raffle: req.body.Raffle,
            Amount: req.body.Amount,
            OrderDate: orderDate
        });
        // req.session.order = order
        res.send(order)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/payment', async (req, res, next) => {
    try {
         let payment;
         if(req.body.ticketId) {
             payment = await Payment.create({
                attendeeId: req.body.id,
                ticketId: req.body.ticketId,
                Amount: req.body.order.Amount,
                PaymentDate: req.body.orderDate
            })
        } else{ 
            payment = await Payment.create({
                vendorId: req.body.id,
                orderId: req.body.orderId,
                Amount: req.body.order.Amount,
                PaymentDate: req.body.orderDate
            })
        }
        res.send(payment)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

   
module.exports = router