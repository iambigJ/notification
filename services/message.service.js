const { v4: uuidv4 } = require("uuid")
const Notification = require('../models/Notification')
const InsideMessages = require('../models/InsideMessages')
const EmailMessages = require('../models/EmailMessages')
const GetToken = require("../models/GetToken")
const sendEmail = require('../tools/sendEmail.tools')
const { pushNotification } = require('../tools/pushNotification.tools')


/* ----------------------------- GET MESSAGES LIST ----------------------------- */
exports.geMessageslist_Services = async (queries) => {

    const match = {}
    if (queries.userId) {
        match['user.userId'] = queries.userId
    }
    if (queries.email) {
        match.email = { $regex: queries.email }
    }
    if (queries.seen) {
        match.seen = queries.seen
    }
    if (queries.sent) {
        match.sent = queries.sent
    }
    if (queries.groupId) {
        match.groupId = queries.groupId
    }
    if (queries.fromDate) {
        match.createdAt = { $gte: new Date(queries.fromDate) }
    }
    if (queries.toDate) {
        match.createdAt = { $lte: new Date(queries.toDate) }
    }
    if (queries.fromDate && queries.toDate) {
        match.createdAt = { $gte: new Date(queries.fromDate), $lte: new Date(queries.toDate) }
    }
    if (queries.type === "inside_message") {
        const getMessages = await InsideMessages
            .find(match)
            .limit(queries.take)
            .skip(queries.page * queries.take)
            .sort({ createdAt: queries.sort })
        return { getMessages, total: getMessages.length }
    }
    if (queries.type === "email") {
        const getMessages = await EmailMessages
            .find(match)
            .limit(queries.take)
            .skip(queries.page * queries.take)
            .sort({ createdAt: queries.sort })
        return { getMessages, total: getMessages.length }
    }
    if (queries.type === "push_notification") {
        const getMessages = await Notification
            .find(match)
            .limit(queries.take)
            .skip(queries.page * queries.take)
            .sort({ createdAt: queries.sort })
        return { getMessages, total: getMessages.length }
    }

    return "لطفا یکی از تایپ های مورد نظر را انتخاب کنید"
}

/* -------------------------- SEND MESSAGE TO USER -------------------------- */
exports.addNewMessage_Services = async (informationBodyTaken) => {
    const uniqueCode = uuidv4()

    var newUserIdList = []
    // type was email
    if (informationBodyTaken.type === "email") {
        var emails = []
        for (user of informationBodyTaken.user) {
            emails.push(user.email)
            newUserIdList.push({ ...informationBodyTaken, groupId: uniqueCode, user: { userId: user.userId, email: user.email } })
        }
        const listOfUsersThatSaveInDatabase = await EmailMessages.insertMany(newUserIdList)
        const emailData = {
            emails: emails,
            title: informationBodyTaken.title,
            message: informationBodyTaken.message,
        }

        console.log(emailData, listOfUsersThatSaveInDatabase);

        sendEmail(emailData, listOfUsersThatSaveInDatabase)
            .catch(err => console.log(err))

        return listOfUsersThatSaveInDatabase
    }
    else if (informationBodyTaken.type === "push_notification") {
        appConfigs.title = informationBodyTaken.title;
        appConfigs.message = informationBodyTaken.message;

        const newListForSaveInDatabase = []
        for (token of informationBodyTaken.user) {
            newListForSaveInDatabase.push({ ...informationBodyTaken, groupId: uniqueCode, user: { userId: token.userId, push_notification_token: token.push_notification_token } })
        }
        const listOfUsersThatSaveInDatabase = await Notification.insertMany(newListForSaveInDatabase)

        pushNotification(listOfUsersThatSaveInDatabase)

        return listOfUsersThatSaveInDatabase
    }
    else if (informationBodyTaken.type === "inside_message") {
        const newUserListForSaveInDatabase = []
        for (user of informationBodyTaken.user) {
            newUserListForSaveInDatabase.push({ ...informationBodyTaken, groupId: uniqueCode, user: { userId: user.userId, email: user.email } })
        }
        const response = await InsideMessages.insertMany(newUserListForSaveInDatabase)
        return response
    }

}
/* ------------------------ Create token from client ------------------------ */
exports.createTokenFromClient_Services = async (token) => {

    const response = new GetToken(token)
    await response.save()
    return response
}