const express = require('express')
const router = express.Router()
const lesson = require('../../../../controllers/user/lessonUser.controller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/user/lesson/ ---------------------- */

/* ------------------- GET LESSONS BY SEASON AND COURSE ID ------------------ */
router.get('/:courseId/:seasonId', asyncHandler(lesson.doGetLessonsBySeasonAndCourseIdGET_Controller))
/* ------------------- ADD LESSON ID IN USER DATA ------------------ */
router.post('/:courseId/:seasonId/:lessonId', asyncHandler(lesson.doAddLessonIdToUserData_Controller))
/* ----------------- CHECK USER ACCESS TO COURSE FIND BY ID ----------------- */
router.get('/detail/:courseId/:seasonId/:lessonId', asyncHandler(lesson.doGetLessonDetailGET_Controller))

module.exports = router