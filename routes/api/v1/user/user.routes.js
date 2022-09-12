const express = require('express')
const router = express.Router()
const user = require('../../../../controllers/user/user.controller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/user/ ---------------------- */

/* -------------------------------- GET USER -------------------------------- */
router.get('/', asyncHandler(user.doGetUserGET_Controller))

module.exports = router