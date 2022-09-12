const express = require('express')
const router = express.Router()
const notificationController = require('../../../../controllers/notification/notification.contorller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* --------------------- perifix: /api/v1/notification/ --------------------- */

/* -------------------------- ADD NEW NOTIFICATION -------------------------- */
router.post('/', asyncHandler(notificationController.doAddNewNotificationPOST_Controller))
/* --------------------- GET COURSE DATA IF USER ACCESS --------------------- */
// router.get('/:courseId', asyncHandler(course.doGetCourseDataByIdIfAccessUserGET_Controller))
/* ----------------- CHECK USER ACCESS TO COURSE FIND BY ID ----------------- */
// router.get('/check/:courseId', asyncHandler(course.doCheckAccessUserToCourseByIdGET_Controller))

module.exports = router