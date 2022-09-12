const express = require('express')
const router = express.Router()
const exam = require('../../../../controllers/admin/examAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ----------------------- perifix: api/v1/admin/exam/ ---------------------- */

/* ----------------------------- GET EXAM BY ID ----------------------------- */
router.get('/', setAdminAuth,adminIsAuth, asyncHandler(exam.doGetExamsListGET_Controller))

router.get('/:courseId/:seasonId/:lessonId', setAdminAuth,adminIsAuth, asyncHandler(exam.doGetExamByIdGET_Controller))

router.post('/', setAdminAuth,adminIsAuth, asyncHandler(exam.doCreateExamPOST_Controller))

router.put('/:examId', setAdminAuth,adminIsAuth, asyncHandler(exam.doEditExamPUT_Controller))

/* ------------------------------- DELETE EXAM ------------------------------ */
router.delete('/:examId', setAdminAuth,adminIsAuth, asyncHandler(exam.doDeleteExamDELETE_Controller))
/* --------------------------- RESTORE DELETE DATA -------------------------- */
router.patch('/restore/:examId', setAdminAuth,adminIsAuth, asyncHandler(exam.doRestoreExamPATCH_Controller))
/* --------------------------- ACTIVE OR INACTIVE --------------------------- */
router.patch('/activeOrInactive/:examId', setAdminAuth,adminIsAuth, asyncHandler(exam.doActiveOrInactiveExamPATCH_Controller))


module.exports = router