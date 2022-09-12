const lessonService = require('../../services/user/lesson.service')
const BaseController = require('../Base.controller')

exports.doGetLessonsBySeasonAndCourseIdGET_Controller = async (req, res) => {
    const { courseId, seasonId } = req.params
    const {
        title,
        teacherName,
        isActive
    } = req.query
    const queries = {
        title,
        teacherName,
        isActive
    }
    const user = req.user
    const result = await lessonService.getLessonsBySeasonAndCourseId_Services(courseId, seasonId, user, queries)
    BaseController.ok(res, result)
}

exports.doGetLessonDetailGET_Controller = async (req, res) => {
    const { courseId, seasonId, lessonId } = req.params
    const user = req.user
    const result = await lessonService.getLessonDetail_Services(courseId, seasonId, lessonId, user)
    BaseController.ok(res, result)
}

exports.doUserExamPOST_Controller = async (req, res) => {
    const { courseId, seasonId, lessonId } = req.params
    const { userAnswers } = req.body
    const user = req.user
    const result = await lessonService.doUserExam_Services(courseId, seasonId, lessonId, user, userAnswers)
    BaseController.ok(res, result)
}
exports.doAddLessonIdToUserData_Controller = async (req, res) => {
    const { courseId, seasonId, lessonId } = req.params

    const user = req.user
    const result = await lessonService.addLessonIdToUserData_Services(courseId, seasonId, lessonId, user)
    BaseController.ok(res, result)
}
