const express = require('express');
const { OfficerHistory } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const officers = await OfficerHistory.findAll({
      order: [['startYear', 'DESC']],
    });
    res.send(officers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
