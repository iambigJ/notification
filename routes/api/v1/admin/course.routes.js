const express = require('express')
const router = express.Router()
const course = require('../../../../controllers/admin/courseAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')
const { upload } = require('../../../../tools/multer.tools')

/* ---------------------- perifix: api/v1/admin/course/ ---------------------- */
router.get('/', setAdminAuth, adminIsAuth, asyncHandler(course.doGetCourseGET_Controller))
/* ---------------------------- GET COURSE BY ID ---------------------------- */
router.get('/:courseId', setAdminAuth, adminIsAuth, asyncHandler(course.doGetCourseByIdGET_Controller))

router.post('/', setAdminAuth, adminIsAuth, asyncHandler(course.doCreateCoursePOST_Controller))

router.put('/:courseId', setAdminAuth, adminIsAuth, asyncHandler(course.doEditCoursePUT_Controller))

/* ------------------------------- DELETE DATA ------------------------------ */
router.delete('/:courseId', setAdminAuth, adminIsAuth, asyncHandler(course.doDeleteCourseDELETE_Controller))
/* --------------------------- RESTORE DELETE DATA -------------------------- */
router.patch('/restore/:courseId', setAdminAuth, adminIsAuth, asyncHandler(course.doRestoreCoursePATCH_Controller))
/* --------------------------- ACTIVE OR INACTIVE --------------------------- */
router.patch('/activeOrInactiveCourse/:courseId', setAdminAuth, adminIsAuth, asyncHandler(course.doActiveOrInactiveCourseUPDATE_Controller))
/* -------------------------- ADD COURSE'S PICTURE -------------------------- */
router.post('/uploadPicture/:courseId', setAdminAuth, adminIsAuth, upload.single('coursePicture'), asyncHandler(course.doUploadCoursePicturePOST_Controller))

module.exports = router