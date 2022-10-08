const express = require('express')
const router = express.Router()
const messagesController = require('../../../../controllers/message/message.contorller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* --------------------- perifix: /api/v1/notification/ --------------------- */

/* ---------------------------- GET NOTIFICATION ---------------------------- */
router.get('/', asyncHandler(messagesController.doGeMessagesListGET_Controller))
/* -------------------------- ADD NEW NOTIFICATION -------------------------- */
router.post('/', asyncHandler(messagesController.doAddNewMessagePOST_Controller))

/* ------------------------ CREATE TOKEN FROM CLIENT ------------------------ */
router.post('/client', asyncHandler(messagesController.doCreateTokenFromClientPOST_Controller))

module.exports = router