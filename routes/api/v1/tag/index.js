const express = require('express')
const router = express.Router()
const tag = require('./tag.routes')

/* -------------------------- prefix: /api/v1/tag/ ------------------------- */
router.use('/', tag)
module.exports = router