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

router.post('/attendee', async (req, res, next) =>{
    try {
        const attendee= await Attendee.create(req.body.information)
        
        const orderInfo = req.body.order
        orderInfo.orderId = attendee.id

        const order = await Ticket.create(orderInfo);
        
        const amount = req.body.order.Amount
        const date = req.body.order.OrderDate
        const payment = await Payment.create({
            attendeeId: attendee.id,
            ticketId: order.id,
            Amount: amount,
            PaymentDate: date
        })

        res.send(payment)
    } catch (error) {
        next(error)
    }
})
   
  
router.post('/vendor', async (req, res, next) => {
    try {
       
        const vendor = await Vendor.create(req.body.information)
        
        const orderInfo = req.body.order
        orderInfo.vendorId = vendor.id

        const order = await Order.create(orderInfo);
        
        const amount = req.body.order.Amount
        const date = req.body.order.OrderDate
        const payment = await Payment.create({
            vendorId: vendor.id,
            orderId: order.id,
            Amount: amount,
            PaymentDate: date
        })

        res.send(payment)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

   
module.exports = router