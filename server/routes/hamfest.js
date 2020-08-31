const express = require('express')
const { Product, Payment, Attendee, Order, Ticket, Vendor } = require("../models");

const router = express.Router()

const tempProd = [
    // { name: 'Advanced Tickets',
    //   dataName: 'Tickets',
    //   price: 8,
    //   onSale: false,
    //   decription: 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.'},
    {name: "Extra chair",
      dataName: "Chairs",
      description: 'a metal folding chair. One chair is provided with each Vendor request.',
      price: 2,
      onSale: false,
      photo: '',
    id:1},
    {name: "Table",
        dataName: "Tables",
      description: '8 foot by 4 foot folding table.',
      price: 25,
      onSale: true,
      photo: '',
      id:3},
    {name: "Electrical",
    dataName: "Electrical",
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '',
      id:2},
      {name: "Tickets",
      dataName: "Tickets",
      description: 'a metal folding chair. One chair is provided with each Vendor request.',
      price: 2,
      onSale: true,
      photo: '',
    id:4}
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
   
  
router.post('/vendor', async (req, res, next) => {
    try {
       
        const order = await Order.create(req.body.order)
        
        const vendorInfo = req.body.vendorInformation
        vendorInfo.orderId = order.id

        const vendor = await Vendor.create(vendorInfo);
        
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

// router.post('/order', async (req, res, next) =>{
//     try {
//         console.log(req.body)
//         const order = await Order.create(req.body)
//         console.log(order)
//         res.send(order)
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// })
   
module.exports = router