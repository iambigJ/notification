const express = require('express')
const router = express.Router()

const admin = require('./admin')
const user = require('./user')
const tag = require('./tag')

// /* ----------------------------- prifix: /api/v1 ---------------------------- */
router.use('/admin', admin)
router.use('/user', user)
router.use('/tags', tag)

module.exports = router