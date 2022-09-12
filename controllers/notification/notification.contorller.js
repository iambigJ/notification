const notificationService = require('../../services/notification.service')
const ErrorResult = require('../../tools/error.tool')
const BaseController = require('../Base.controller')

// exports.doGetCourseGET_Controller = async (req, res) => {
//     const user = req.user
//     const {
//         title,
//         teacherName,
//         prerequisites_id,
//         isActive,
//         tags,
//     } = req.query
//     const queries = {
//         title,
//         teacherName,
//         prerequisites_id,
//         isActive,
//         tags
//     }
//     const result = await userCourseService.getCourses_Services(user, queries)
//     BaseController.ok(res, result)
// }

exports.doAddNewNotificationPOST_Controller = async (req, res) => {
    const {
        userId,
        type,
        email,
        title,
        message,
        push_message,
        push_notification_service,
        push_notification_token

    } = req.body
    const informationBodyTaken = {
        userId,
        type,
        email,
        title,
        message,
        push_message,
        push_notification_service,
        push_notification_token
    }
    if (!userId) {
        throw ErrorResult.badRequest('فیلد آی دی کاربر را پر کنید', 'userId_required')
    }
    if (!type) {
        throw ErrorResult.badRequest('فیلد تایپ را پر کنید', 'type_required')
    }
    if (!message) {
        throw ErrorResult.badRequest('فیلد پیام را پر کنید', 'message_required')
    }
    if (!title) {
        throw ErrorResult.badRequest('فیلد عنوان را پر کنید', 'title_required')
    }
    if (type === "email") {

        if (!email) {
            throw ErrorResult.badRequest('فیلد ایمیل را پر کنید', 'email_required')
        }
    }
    if (type === "push_notification") {
        if (!push_notification_service || !push_notification_token || !push_message) {
            throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
        }
    }
    const result = await notificationService.addNewNotification_Services(informationBodyTaken)
    BaseController.ok(res, result)
}
// exports.doCheckAccessUserToCourseByIdGET_Controller = async (req, res) => {
//     const { courseId } = req.params
//     const user = req.user
//     const result = await userCourseService.checkAccessUserToCourseById_Services(user, courseId)
//     BaseController.ok(res, result)
// }
