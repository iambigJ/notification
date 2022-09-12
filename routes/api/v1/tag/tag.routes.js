const express = require('express')
const router = express.Router()
const tag = require('../../../../controllers/tag/tag.controller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/tag/ ---------------------- */

/* ---------------------------- SEARCH LIKE TAGS ---------------------------- */
router.get('/', asyncHandler(tag.doSearchTagGET_Controller))

module.exports = router