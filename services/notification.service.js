const Notification = require('../models/Notification')
const ErrorResult = require('../tools/error.tool')
const main = require('../tools/sendEmail.tools')


/* ----------------------------- GET MESSAGES LIST ----------------------------- */
exports.geMessageslist_Services = async (queries) => {
    const match = {}
    if (queries.id) {
        match['users.id'] = queries.id
    }
    if (queries.email) {
        match.email = { $regex: queries.email }
    }
    if (queries.type) {
        match.type = queries.type
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
    const getNotification = await Notification.find(match)
    return getNotification
}

/* -------------------------- SEND MESSAGE TO USER -------------------------- */
exports.addNewNotification_Services = async (informationBodyTaken) => {
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
                await Notification.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
            .catch(async err => {
                console.log(err)
                for (user of informationBodyTaken.users) {
                    newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email } })
                }
                await Notification.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
    }

}