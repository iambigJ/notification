const Notification = require('../models/Notification')
const ErrorResult = require('../tools/error.tool')
const main = require('../tools/sendEmail.tools')
const webPush = require("web-push")


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
    // type is push_notification
    if (informationBodyTaken.type === "push_notification") {

        const publicVapidKey = 'BD1Zf7bN4Hyso4YXAmKJiUuIE7teESslRoEGbZhKyvEfxuPs92YDvG-Fwaig6_WZ2IjVUDv07m_VRBpm6dFrwZI'
        const privateVapidKeys = 'TA3typPc09Q4fcEHMKcWew9PgRmrPmyyNpoOCSfCy0g'

        webPush.setVapidDetails("mailto:rmussavi@gmail.com", publicVapidKey, privateVapidKeys)
        const subscription = {
            endpoint: 'https://fcm.googleapis.com/fcm/send/c0jOOjEkMkU:APA91bHZS9tTL3g_ukGTebpWG133WFAKXHh9qQz9y3G3dBcKiSJZ_V_tJpLlXnjlVevexICt61UJmwu9K6WpLJTlEMn0CM77P8gyLkt1lYpEd7TpD5mf7t1xOkjj_ANmehliCbvuS_CN',
            expirationTime: null,
            keys: {
                auth: 'lkgP9MU7Gd_TP36O_4UJdg',
                p256dh: 'BP4y-b-YUS3C8B4e3Sz3UPvxMIOyOFkO3IxSeMR4pmoDkWokmqj_qQkrBuDOJhrfOYr4Vdbwv5XSP1uCGj8ydds',
            },
            headers: {
                "content-type": "application/json"
            }
        };
        const payload = JSON.stringify({
            title: "New Product From Aka",
        })
        webPush.sendNotification(subscription, payload).catch(err => {
            console.log(err)
        })
        return 'ok'
    }

}