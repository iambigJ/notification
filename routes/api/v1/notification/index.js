const express = require('express')
const router = express.Router()
const notification = require('./notification.routes')



/* -------------------------- prefix: /api/v1/notification/ ------------------------- */
router.use('/', notification)
module.exports = router