const router = require('express')();
const sequelize = require('sequelize');
const { CalendarEvent } = require('../models');

const Op = sequelize.Op;

router.get('/', async (req, res, next) => {
  try {
    const events = await CalendarEvent.findAll();
    console.log('hello');
    res.send(events);
  } catch (error) {
    next(error);
  }
});

router.get('/month', async (req, res, next) => {
  try {
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    const events = await CalendarEvent.findAll({
      where: {
        [Op.or]: [
          {
            Start: {
              [Op.between]: [today, endDate],
            },
          },
          {
            Type: {
              [Op.eq]: 'Special Event',
            },
          },
        ],
      },
      order: [['Start', 'ASC']],
    });
    res.send(events);
  } catch (error) {
    next(error);
  }
});

router.get('/training', async (req, res, next) => {
  try {
    const today = new Date();
    const events = await CalendarEvent.findAll({
      where: {
        [Op.and]: [
          {
            Start: {
              [Op.gte]: today,
            },
          },
          {
            Type: {
              [Op.or]: ['Training Class', 'Testing'],
            },
          },
        ],
      },
      order: [['Start', 'ASC']],
    });
    res.send(events);
  } catch (error) {
    next(error);
  }
});

router.post('/newEvent', async (req, res, next) => {
  try {
    const newEvent = await CalendarEvent.create(req.body);
    res.send(newEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
