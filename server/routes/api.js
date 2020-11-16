const express = require('express');

const router = express.Router();

router.use('/membership', require('./membership'));
router.use('/hamfest', require('./hamfest'));
router.use('/user', require('./user'));
router.use('/officerHistory', require('./officerHistory'));
router.use('/Announcement', require('./Announcements'));
router.use('/calendar', require('./calendar'));

//404 routes - put after all routes aka just before the export
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
