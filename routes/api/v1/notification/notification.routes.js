const express = require('express')
const router = express.Router()
const messagesController = require('../../../../controllers/message/message.contorller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* --------------------- perifix: /api/v1/notification/ --------------------- */

/* ---------------------------- GET NOTIFICATION ---------------------------- */
router.get('/', asyncHandler(messagesController.doGeMessageslistGET_Controller))
/* -------------------------- ADD NEW NOTIFICATION -------------------------- */
router.post('/', asyncHandler(messagesController.doAddNewMessagePOST_Controller))
/* ----------------- CHECK USER ACCESS TO COURSE FIND BY ID ----------------- */
// router.get('/check/:courseId', asyncHandler(course.doCheckAccessUserToCourseByIdGET_Controller))

module.exports = router