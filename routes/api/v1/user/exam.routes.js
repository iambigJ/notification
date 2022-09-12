const express = require('express')
const router = express.Router()
const exam = require('../../../../controllers/exam/exam.contorller')
const lesson = require('../../../../controllers/user/lessonUser.controller')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/user/exam/ ---------------------- */

/* ---------------------------- DO EXAM FOR USER ---------------------------- */
router.post('/doExam/:courseId/:seasonId/:lessonId', asyncHandler(lesson.doUserExamPOST_Controller))

/* -------------------- GET USERS'S LIST OF SPECIAL EXAM -------------------- */
router.get('/users/:examId', asyncHandler(exam.doGetUsersOfSpecialExamGET_Controller))


module.exports = router