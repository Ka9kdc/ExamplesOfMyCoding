const express = require('express')

const router = express.Router()

router.use('/membership', require('./membership'))

module.exports = router