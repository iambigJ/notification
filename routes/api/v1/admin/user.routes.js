const express = require('express')
const router = express.Router()
const user = require('../../../../controllers/admin/userAdmin.controller')
const { setAdminAuth } = require('../../../../Hamsaz_common_code/auth')
const { adminIsAuth } = require('../../../../middlewares/adminIsAuth.middleware')
const { asyncHandler } = require('../../../../tools/asyncHandler.tools')

/* ---------------------- perifix: api/v1/admin/user/ --------------------- */

/* ----------------------------- GET USERS LIST ----------------------------- */
router.get('/', setAdminAuth, adminIsAuth, asyncHandler(user.doGetUsersListGET_Controller))

/* ----------------------------- GET USER BY ID ----------------------------- */
router.get('/:userId', setAdminAuth, adminIsAuth, asyncHandler(user.doGetUserByIdGET_Controller))

// /* ------------------------------- EDIT SEASON ------------------------------ */
// router.patch('/:courseId/:seasonId', asyncHandler(season.doEditSeasonPATCH_Controller))

/* ---------------------------- USER BAN OR UNBAN --------------------------- */
router.patch('/banOrUnban/:userId', setAdminAuth, adminIsAuth, asyncHandler(user.doUserBanOrUnBanPATCH_Controller))
/* ------------------------------- CHANGE ROLE ------------------------------ */
router.patch('/changeRole/:userId/:role', setAdminAuth, adminIsAuth, asyncHandler(user.doUserChangeRolePATCH_Controller))

/* ------------------------------- DELETE USER ------------------------------ */
router.delete('/:userId', setAdminAuth, adminIsAuth, asyncHandler(user.doDeleteUserDELETE_Controller))
/* ------------------------------ RESTORE USER ------------------------------ */
router.patch('/restore/:userId', setAdminAuth, adminIsAuth, asyncHandler(user.doRestoreUserPATCHE_Controller))

// /* ------------------------ ACTIVE AND INACTIVE SEASON ----------------------- */
// router.patch('/:courseId/:seasonId/activeOrInactiveSeason', asyncHandler(season.doActiveOrInactiveSeasonOfCourseUPDATE_Controller))

module.exports = router