const messageService = require('../../services/message.service')
const ErrorResult = require('../../tools/error.tool')
const BaseController = require('../Base.controller')

exports.doGeMessageslistGET_Controller = async (req, res) => {

    const {
        userId,
        email,
        type,
        push_notification,
        seen,
        sent,
        fromDate,
        toDate,
        sort,
        groupId
    } = req.query
    const queries = {
        userId,
        email,
        type,
        push_notification,
        seen,
        sent,
        fromDate,
        toDate,
        page: parseInt(req.query.page - 1),
        take: parseInt(req.query.take) || 10,
        sort,
        groupId
    }

    const result = await messageService.geMessageslist_Services(queries)
    BaseController.ok(res, result)
}

exports.doAddNewMessagePOST_Controller = async (req, res) => {
    const {
        users,
        type,
        title,
        message,
        push_notification_service,
    } = req.body
    const informationBodyTaken = {
        user: users,
        type,
        title,
        message,
        push_notification_service,
    }
    for (let user of users) {
        if (!user.userId) {
            throw ErrorResult.badRequest('فیلد آی دی کاربر را پر کنید', 'userId_required')
        }
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
        for (let user of users) {
            if (!user.email) {
                throw ErrorResult.badRequest('فیلد ایمیل را پر کنید', 'email_required')
            }
        }
    }
    if (type === "push_notification") {
        for (let user of users) {
            if (!user.push_notification_token) {
                throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
            }
        }
        if (!push_notification_service) {
            throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
        }
    }
    const result = await messageService.addNewMessage_Services(informationBodyTaken)
    BaseController.ok(res, result)
}


exports.doCreateTokenFromClientPOST_Controller = async (req, res) => {
    const token = req.body
    const result = await messageService.createTokenFromClient_Services(token)
    BaseController.ok(res, result)
}

