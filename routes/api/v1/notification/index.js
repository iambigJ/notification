const express = require('express')
const router = express.Router()
const messagesController = require('../../../../controllers/message/message.contorller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* --------------------- prefix: /api/v1/notification/ --------------------- */

router.get('/', asyncHandler(messagesController.doGeMessagesListGET_Controller))
router.post('/', asyncHandler(messagesController.doAddNewMessagePOST_Controller))

router.post('/client', asyncHandler(messagesController.doCreateTokenFromClientPOST_Controller))

module.exports = router