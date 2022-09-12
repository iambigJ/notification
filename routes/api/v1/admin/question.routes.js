const express = require('express')
const router = express.Router()
const question = require('../../../../controllers/admin/questionAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/admin/question/ --------------------- */

/* ---------------------- GET QUESTIONS LIST BY EXAM ID --------------------- */
router.get('/:examId',setAdminAuth,adminIsAuth, asyncHandler(question.doGetQuestionsByExamIdGET_Controller))

// // /* ------------------------ GET SEASON'S LESSON BY ID ----------------------- */
// router.get('/:courseId/:seasonId/:lessonId', asyncHandler(lesson.doGetLessonsByIdGET_Controller))

/* ------------------------------ ADD QUESTION ------------------------------ */
router.post('/:examId',setAdminAuth,adminIsAuth, asyncHandler(question.doAddQuestionToExamPOST_Controller))

/* ------------------------------ EDIT QUESTION ----------------------------- */
router.put('/:examId/:questionId',setAdminAuth,adminIsAuth, asyncHandler(question.doEditQuestionPUT_Controller))

/* ----------------------------- DELETE QUESTION ---------------------------- */
router.delete('/:examId/:questionId',setAdminAuth,adminIsAuth, asyncHandler(question.doDeleteQuestionDELETE_Controller))

/* ---------------------------- RESTORE QUESTION ---------------------------- */
router.patch('/restore/:examId/:questionId',setAdminAuth,adminIsAuth, asyncHandler(question.doRestoreQuestionUPDATE_Controller))

/* ---------------------- ACTIVE AND INACTIVE QUESTION ---------------------- */
router.patch('/activeOrInactiveQuestion/:examId/:questionId',setAdminAuth,adminIsAuth, asyncHandler(question.doActiveOrInactiveQuestionUPDATE_Controller))

// /* -------------------------- ADD LESSON'S PICTURE -------------------------- */
// router.post('/uploadPicture/:courseId/:seasonId/:lessonId', upload.single('lessonPicture'), asyncHandler(lesson.doUploadLessonPicturePOST_Controller))
// /* ---------------------- ADD LESSON'S VIDEO AND VOICE ---------------------- */
// router.post('/uploadVideoOrVoice/:courseId/:seasonId/:lessonId/:typeData', upload.single('videoOrVoice'), asyncHandler(lesson.doUploadLessonVideoOrVoicePOST_Controller))

module.exports = router