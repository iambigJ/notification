const express = require('express')
const router = express.Router()
const notificationController = require('../../../../controllers/notification/notification.contorller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* --------------------- perifix: /api/v1/notification/ --------------------- */

/* ---------------------------- GET NOTIFICATION ---------------------------- */
router.get('/', asyncHandler(notificationController.doGeMessageslistGET_Controller))
/* -------------------------- ADD NEW NOTIFICATION -------------------------- */
router.post('/', asyncHandler(notificationController.doAddNewNotificationPOST_Controller))
/* ----------------- CHECK USER ACCESS TO COURSE FIND BY ID ----------------- */
// router.get('/check/:courseId', asyncHandler(course.doCheckAccessUserToCourseByIdGET_Controller))

module.exports = router