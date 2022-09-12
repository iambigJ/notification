const userCourseService = require('../../services/user/course.service')
const BaseController = require('../Base.controller')

exports.doGetCourseGET_Controller = async (req, res) => {
    const user = req.user
    const {
        title,
        teacherName,
        prerequisites_id,
        isActive,
        tags,
    } = req.query
    const queries = {
        title,
        teacherName,
        prerequisites_id,
        isActive,
        tags
    }
    const result = await userCourseService.getCourses_Services(user, queries)
    BaseController.ok(res, result)
}

exports.doGetCourseDataByIdIfAccessUserGET_Controller = async (req, res) => {
    const { courseId } = req.params
    const user = req.user
    const result = await userCourseService.getCourseDataByIdIfAccessUser_Services(user, courseId)
    BaseController.ok(res, result)
}
exports.doCheckAccessUserToCourseByIdGET_Controller = async (req, res) => {
    const { courseId } = req.params
    const user = req.user
    const result = await userCourseService.checkAccessUserToCourseById_Services(user, courseId)
    BaseController.ok(res, result)
}
