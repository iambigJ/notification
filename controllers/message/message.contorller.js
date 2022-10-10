const messageService = require('../../services/message.service')
const ErrorResult = require('../../tools/error.tool');
const { getDataFromReqQuery } = require('../../tools/general.tool');
const BaseController = require('../Base.controller')

exports.doGeMessagesListGET_Controller = async (req, res) => {
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
        groupId,
        page = 1,
        take = 10,
        updateSeen = false
    } = getDataFromReqQuery(req.query);

    const queries = {
        userId,
        email,
        type,
        push_notification,
        seen,
        sent,
        fromDate,
        toDate,
        sort,
        groupId,
        updateSeen,
        page: parseInt(page - 1),
        take: parseInt(take) || 10,
    }

    const result = await messageService.geMessagesList_Services(queries)
    return BaseController.ok(res, result)
}

exports.doAddNewMessagePOST_Controller = async (req, res) => {
    const {
        users,
        type,
        title,
        message,
        push_notification_service,
        moreData,
    } = req.body;

    const informationBodyTaken = {
        user: users,
        type,
        title,
        message,
        push_notification_service,
        moreData
    };

    for (let user of users) {
        if (user.userId === null || user.userId === undefined) {
            throw ErrorResult.badRequest('فیلد آی دی کاربر را پر کنید', 'userId_required');
        }
    }
    if (!type) {
        throw ErrorResult.badRequest('فیلد تایپ را پر کنید', 'type_required');
    }
    if (!message) {
        throw ErrorResult.badRequest('فیلد پیام را پر کنید', 'message_required');
    }
    if (!title) {
        throw ErrorResult.badRequest('فیلد عنوان را پر کنید', 'title_required');
    }
    if (type === "email") {
        for (let user of users) {
            if (!user.email) {
                throw ErrorResult.badRequest('فیلد ایمیل را پر کنید', 'email_required');
            }
        }
    }
    if (type === "push_notification") {
        if (!push_notification_service) {
            throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
        }
        for (let user of users) {
            if (!user.push_notification_token) {
                throw ErrorResult.badRequest('فیلد نام سرویس یا توکن یا پیام کوتاه سرویس را پر کنید', 'push_notification_service_or_notification_token_required')
            }
        }
    }
    const result = await messageService.addNewMessage_Services(informationBodyTaken);

    return BaseController.ok(res, result);
}


exports.doCreateTokenFromClientPOST_Controller = async (req, res) => {
    const token = req.body
    const result = await messageService.createTokenFromClient_Services(token)
    BaseController.ok(res, result)
}

