const express = require('express')

const { Member, Committee, Badge, Payment } = require('../models')


const router = express.Router()



router.post('/member', async (req, res, next) =>{
    try{
        const newMember = await Member.create(req.body);
        res.send(newMember)
    } catch (error) {
        next(error)
    }
})

router.post('/badge', async (req, res, next) =>{
    try{
        const newBadge = await Badge.create(req.body);
        res.send(newBadge)
    } catch (error) {
        next(error)
    }
})

router.post('/commitee', async (req, res, next) =>{
    try{
        const commiteeMember = await Committee.create(req.body);
        res.send(commiteeMember)
    } catch (error) {
        next(error)
    }
})

router.post('/payment', async (req, res, next) =>{
    try{
        const newPayment = await Payment.create(req.body);
        res.send(newPayment)
    } catch (error) {
        next(error)
    }
})

module.exports = router