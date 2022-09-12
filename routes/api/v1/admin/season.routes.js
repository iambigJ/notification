const express = require('express')
const router = express.Router()
const season = require('../../../../controllers/admin/seasonAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/admin/season/ --------------------- */

/* ------------------------ GET SEASONS BY COURSE ID ------------------------ */
router.get('/:courseId', setAdminAuth, adminIsAuth, asyncHandler(season.doGetSeasonsByCourseIdGET_Controller))

/* ------------------------ GET COURSE'S SEASON BY ID ----------------------- */
router.get('/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(season.doGetSeasonByIdGET_Controller))

/* ------------------------------- EDIT SEASON ------------------------------ */
router.put('/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(season.doEditSeasonPATCH_Controller))

/* ------------------------ INCLUDE SEASON TO COURSE ------------------------ */
router.post('/:courseId', setAdminAuth, adminIsAuth, asyncHandler(season.doIncludeSeasonToCoursePATCH_Controller))

/* ------------------------------ DELETE SEASON ----------------------------- */
router.delete('/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(season.doDeleteSeasonOfCourseUPDATE_Controller))
/* ----------------------------- RESTORE SEASON ----------------------------- */
router.patch('/restore/:courseId/:seasonId', setAdminAuth, adminIsAuth, asyncHandler(season.doRestoreSeasonOfCourseUPDATE_Controller))

/* ------------------------ ACTIVE AND INACTIVE SEASON ----------------------- */
router.patch('/:courseId/:seasonId/activeOrInactiveSeason', setAdminAuth, adminIsAuth, asyncHandler(season.doActiveOrInactiveSeasonOfCourseUPDATE_Controller))

module.exports = router