const express = require('express')
const { Product, Payment, Attendee, Order, Ticket, Vendor } = require("../models");
const { noExtendLeft } = require('sequelize/types/lib/operators');

const router = express.Router()



router.get("/", async (req, res, next) => {
    try{
        const products = await Product.findAll()
      res.send(store(products));
    } catch (error) {
        next(error)
    }
});

   
   
   
module.exports = router