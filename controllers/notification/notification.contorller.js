const notificationService = require('../../services/notification.service')
const ErrorResult = require('../../tools/error.tool')
const BaseController = require('../Base.controller')

exports.doGeMessageslistGET_Controller = async (req, res) => {
    const {
        id,
        email,
        type,
        push_notification,
        seen,
        sent,
        fromDate,
        toDate
    } = req.query
    const queries = {
        id,
        email,
        type,
        push_notification,
        seen,
        sent,
        fromDate,
        toDate
    }

    const result = await notificationService.geMessageslist_Services(queries)
    BaseController.ok(res, result)
}

exports.doAddNewNotificationPOST_Controller = async (req, res) => {
    const {
        users,
        type,
        title,
        message,
        push_notification_service,
        push_notification_token

    } = req.body
    const informationBodyTaken = {
        users,
        type,
        title,
        message,
        push_notification_service,
        push_notification_token
    }
    for (user of users) {
        if (!user.id) {
            throw ErrorResult.badRequest('فیلد آی دی کاربر را پر کنید', 'userId_required')
        }
    }
    // if (!userId) {
    //     throw ErrorResult.badRequest('فیلد آی دی کاربر را پر کنید', 'userId_required')
    // }
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
        for (user of users) {
            if (!user.email) {
                throw ErrorResult.badRequest('فیلد ایمیل را پر کنید', 'email_required')
            }
        }
    }
    if (type === "push_notification") {
        if (!push_notification_service || !push_notification_token) {
            throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
        }
    }
    const result = await notificationService.addNewNotification_Services(informationBodyTaken)
    BaseController.ok(res, result)
}

