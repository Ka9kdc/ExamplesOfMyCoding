const express = require('express')
const Annoucement = require('../models/Annoucement')

const router = express.Router()


router.get('/all', async (req, res, next) => {
    try {
        const allAnnouncements = await Annoucement.findAll({
            order: [
                ['PostDate', 'ASC']
            ],
            attributes: ['PostDate', 'message', 'borderColor', 'backgroundColor']
        })
        res.send(allAnnouncements)
    } catch (error) {
        next(error)
    }
})

router.get('/last', async (req, res, next) => {
    try {
        const lastAnnouncement = await Annoucement.findAll({
            order: ['PostDate'],
            limit: 1
        })
        res.send(lastAnnouncement[0])
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newAnnouncement = await Annoucement.create({
            borderColor: req.body.borderColor,
            backgroundColor: req.body.backgroundColor,
            message: req.body.message,
            PostDate: req.body.PostDate
        })
        // newAnnouncement.setUser(req.body.user)
        req.send(newAnnouncement)
    } catch (error) {
        next(error)
    }
})

module.exports = router