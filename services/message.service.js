const Notification = require('../models/Notification')
const InsideMessages = require('../models/InsideMessages')
const EmailMessages = require('../models/EmailMessages')
const ErrorResult = require('../tools/error.tool')
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
            .limit(queries.limit)
            .skip(queries.skip)
            .sort({ createdAt: queries.sort })
        return { getMessages, Total: getMessages.length }
    }
    if (queries.type === "email") {
        const getMessages = await EmailMessages
            .find(match)
            .limit(queries.limit)
            .skip(queries.skip)
            .sort({ createdAt: queries.sort })
        return { getMessages, Total: getMessages.length }
    }
    if (queries.type === "push_notification") {
        const getMessages = await Notification
            .find(match)
            .limit(queries.limit)
            .skip(queries.skip - 1)
            .sort({ createdAt: queries.sort })
        return { getMessages, Total: getMessages.length }
    }

    return "لطفا یکی از تایپ های مورد نظر را انتخاب کنید"
}

/* -------------------------- SEND MESSAGE TO USER -------------------------- */
exports.addNewMessage_Services = async (informationBodyTaken) => {

    var newUserIdList = []
    // type was email
    if (informationBodyTaken.type === "email") {
        var emails = []
        for (user of informationBodyTaken.user) {
            emails.push(user.email)
            newUserIdList.push({ ...informationBodyTaken, user: { userId: user.userId, email: user.email } })
        }
        const listOfUsersThatSaveInDatabase = await EmailMessages.insertMany(newUserIdList)
        const emailData = {
            emails: emails,
            title: informationBodyTaken.title,
            message: informationBodyTaken.message,
        }

        sendEmail(emailData, listOfUsersThatSaveInDatabase)
            .catch(err => console.log(err))

        return listOfUsersThatSaveInDatabase
    }


    // type is push_notification
    if (informationBodyTaken.type === "push_notification") {

        appConfigs.title = informationBodyTaken.title
        appConfigs.message = informationBodyTaken.message

        const listOfTokens = []
        const newListForSaveInDatabase = []

        for (token of informationBodyTaken.user) {
            // listOfTokens.push(token.push_notification_token)
            newListForSaveInDatabase.push({ ...informationBodyTaken, user: { userId: token.userId, push_notification_token: token.push_notification_token } })
        }

        const listOfUsersThatSaveInDatabase = await Notification.insertMany(newListForSaveInDatabase)

        pushNotification(listOfUsersThatSaveInDatabase)

        return listOfUsersThatSaveInDatabase
    }

    // type is inside_message
    if (informationBodyTaken.type === "inside_message") {
        const newUserListForSaveInDatabase = []
        console.log(informationBodyTaken)
        for (user of informationBodyTaken.user) {
            newUserListForSaveInDatabase.push({ ...informationBodyTaken, user: { userId: user.userId, email: user.email } })
        }
        const response = await InsideMessages.insertMany(newUserListForSaveInDatabase)
        return response
    }

}