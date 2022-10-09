const express = require('express')
const router = express.Router()

const notification = require('./notification')

/* ----------------------------- prifix: /api/v1 ---------------------------- */
router.use('/notification', notification)

module.exports = router