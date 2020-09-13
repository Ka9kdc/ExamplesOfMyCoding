const express = require('express')

const { Member, Committee, Badge, Payment } = require('../models');
const member = require('../models/member');


const router = express.Router()



router.post('/member', async (req, res, next) =>{
    try{
        const newMember = await Member.create({
            FirstName: req.body.FirstName,
            LastName: req.bady.LastName,
            CallSign: req.body.CallSign,
            Phone: req.body.Phone,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Zip: req.body.Zip,
            Membership: req.body.Membership,
            Email: req.body.Email,
            RenewalDate: req.body.RenewalDate,
            DueYear: req.body.DueYear
        });
        res.send(newMember)
    } catch (error) {
        next(error)
    }
})

router.post('/family', async (req, res, next) =>{
    try{
        const newMember = await Member.create({ 
            FirstName: req.body.FirstName,
            LastName: req.bady.LastName,
            CallSign: req.body.CallSign,
            Phone: req.body.Phone,
            Street: req.body.Street,
            City: req.body.City,
            State: req.body.State,
            Zip: req.body.Zip,
            Membership: req.body.Membership,
            Email: req.body.Email,
            RenewalDate: req.body.RenewalDate,
            DueYear: req.body.DueYear
        });
        if(req.body.FamilyMembers && req.body.FamilyMembers.length){
             req.body.FamilyMembers.forEach(member => {
                newMember.addFamily(member)
            });
        }
       
        res.send(newMember.id)
    } catch (error) {
        next(error)
    }
})

router.post('/badge', async (req, res, next) =>{
    try{
        const newBadge = await Badge.create({
            Desired: req.body.Desired,
            Type: req.body.badgeType,
            Arrl: req.body.ArrlLogo,
            Color: req.body.Color,
            Name: req.body.badgeName,
            LicenseYear: req.body.LicenseYear,
            RenewalDate: req.body.RenewalDate
        });
        member.addBadge(newBadge)
        res.send(newBadge.id)
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