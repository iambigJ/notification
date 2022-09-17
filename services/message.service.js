const Notification = require('../models/Notification')
const InsideMessages = require('../models/InsideMessages')
const EmailMessages = require('../models/EmailMessages')
const ErrorResult = require('../tools/error.tool')
const main = require('../tools/sendEmail.tools')
const { pushNotification } = require('../tools/pushNotification.tools')
const { query } = require('express')


/* ----------------------------- GET MESSAGES LIST ----------------------------- */
exports.geMessageslist_Services = async (queries) => {
    const match = {}
    if (queries.id) {
        match['users.id'] = queries.id
    }
    if (queries.email) {
        match.email = { $regex: queries.email }
    }
    // if (queries.type) {
    //     match.type = queries.type
    // }
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
        const getMessages = await InsideMessages.find(match)
        return getMessages
    }
    if (queries.type === "email") {
        const getMessages = await EmailMessages.find(match)
        return getMessages
    }
    if (queries.type === "push_notification") {
        const getMessages = await Notification.find(match)
        return getMessages
    }
    return "لطفا یکی از تایپ های مورد نظر را انتخاب کنید"
}

/* -------------------------- SEND MESSAGE TO USER -------------------------- */
exports.addNewMessage_Services = async (informationBodyTaken) => {
    var newUserIdList = []
    var newUserListForSaveInDatabase = []
    // type was email
    if (informationBodyTaken.type === "email") {
        var emails = []
        for (user of informationBodyTaken.users) {
            emails.push(user.email)
            newUserIdList.push({ ...informationBodyTaken, users: { id: user.id, email: user.email } })
        }
        const emailData = {
            emails: emails,
            title: informationBodyTaken.title,
            message: informationBodyTaken.message,
        }
        return main(emailData)
            .then(async res => {
                for (user of informationBodyTaken.users) {
                    newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email }, sent_date: new Date(), sent: true })
                }
                await EmailMessages.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
            .catch(async err => {
                console.log(err)
                for (user of informationBodyTaken.users) {
                    newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email } })
                }
                await EmailMessages.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
    }
    // type is push_notification
    if (informationBodyTaken.type === "push_notification") {

        pushNotification()
        return 'ok'
    }
    // type is inside_message
    if (informationBodyTaken.type === "inside_message") {
        for (user of informationBodyTaken.users) {
            newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email } })
        }
        const response = await InsideMessages.insertMany(newUserListForSaveInDatabase)
        return response
    }

}