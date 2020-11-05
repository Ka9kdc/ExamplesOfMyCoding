const router = require('express')()
const {CalendarEvent} = require('../models')


router.get('/', async (req, res, next) => {
    try{
        const events = await CalendarEvent.findAll()
        res.send(events)
    } catch (error){
        next(error)
    }
})

router.get('/:month', async (req, res, next) => {
    try {
        const events = await CalendarEvent.findAll({where: {date: req.params.month}})
        res.send(events)
    } catch (error){
        next(error)
    }
})

router.post('/newEvent', async (req, res, next) => {
    try{
        const newEvent = await CalendarEvent.create(req.body)
        res.send(newEvent)
    } catch (error){
        next(error)
    }
})

module.exports = router