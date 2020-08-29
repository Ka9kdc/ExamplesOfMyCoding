const express = require('express')

const router = express.Router()

router.use('/membership', require('./membership'))

router.get((req, res, next) =>{
    res.send("Page Not Found")
})

module.exports = router