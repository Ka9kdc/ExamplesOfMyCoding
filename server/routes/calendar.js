const router = require('express')()
const {Event} = require('../models')


router.get('/', async (req, res, next) => {
    try{
        const events = await Event.findAll({order: ['Date']})
        res.send(events)
    } catch (error){
        next(error)
    }
})

router.get('/:month', async (req, res, next) => {
    try {
        const events = await Event.findAll({where: {date: req.params.month}})
        res.send(events)
    } catch (error){
        next(error)
    }
})

router.post('/newEvent', async (req, res, next) => {
    try{
        const newEvent = await Event.create(req.body)
        res.send(newEvent)
    } catch (error){
        next(error)
    }
})

module.exports = Router