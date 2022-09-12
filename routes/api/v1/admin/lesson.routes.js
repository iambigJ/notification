const express = require('express')
const router = express.Router()
const lesson = require('../../../../controllers/admin/lessonAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')
const { upload } = require('../../../../tools/multer.tools')

/* ---------------------- perifix: api/v1/admin/lesson/ --------------------- */

/* ------------------- GET LESSONS BY SEASON AND COURSE ID ------------------ */
router.get('/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(lesson.doGetLessonsBySeasonAndCourseIdGET_Controller))

/* ---------------------------- GET LESSON BY ID ---------------------------- */
router.get('/:courseId/:seasonId/:lessonId', setAdminAuth, adminIsAuth, asyncHandler(lesson.doGetLessonsByIdGET_Controller))

/* ------------------------ INCLUDE LESSON TO SEASON ------------------------ */
router.post('/includeLesoon/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(lesson.doIncludeLessonToSeasonPATCH_Controller))

/* ------------------------------- EDIT LESSON ------------------------------ */
router.patch('/:courseId/:seasonId/:lessonId/:typeData', setAdminAuth, adminIsAuth, upload.single('videoOrVoice'), asyncHandler(lesson.doEditLessonPATCH_Controller))

/* ------------------------------ DELETE LESSON ----------------------------- */
router.delete('/:courseId/:seasonId/:lessonId', setAdminAuth, adminIsAuth, asyncHandler(lesson.doDeleteLessonOfSeasonDELETE_Controller))
/* ----------------------------- RESTORE LESSON ----------------------------- */
router.patch('/restore/:courseId/:seasonId/:lessonId', setAdminAuth, adminIsAuth, asyncHandler(lesson.doRestoreLessonOfSeasonUPDATE_Controller))

/* ----------------------- ACTIVE AND INACTIVE LESSON ----------------------- */
router.patch('/activeOrInactiveLesson/:courseId/:seasonId/:lessonId/', setAdminAuth, adminIsAuth, asyncHandler(lesson.doActiveOrInactiveLessonOfSeasonUPDATE_Controller))

/* -------------------------- ADD LESSON'S PICTURE -------------------------- */
router.post('/uploadPicture/:courseId/:seasonId/:lessonId', setAdminAuth, adminIsAuth, upload.single('lessonPicture'), asyncHandler(lesson.doUploadLessonPicturePOST_Controller))
/* ---------------------- ADD LESSON'S VIDEO AND VOICE ---------------------- */
router.post('/uploadVideoOrVoice/:courseId/:seasonId/:lessonId/:typeData', setAdminAuth, adminIsAuth, upload.single('videoOrVoice'), asyncHandler(lesson.doUploadLessonVideoOrVoicePOST_Controller))

module.exports = router