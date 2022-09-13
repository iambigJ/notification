const Notification = require('../models/Notification')
const ErrorResult = require('../tools/error.tool')
const main = require('../tools/sendEmail.tools')


/* ----------------------------- GET MESSAGES LIST ----------------------------- */
exports.geMessageslist_Services = async (queries) => {

    const getNotification = await Notification.find()
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
                    newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email }, isSent: new Date() })
                }
                await Notification.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
            .catch(async err => {
                console.log(err.message)
                for (user of informationBodyTaken.users) {
                    newUserListForSaveInDatabase.push({ ...informationBodyTaken, users: { id: user.id, email: user.email } })
                }
                await Notification.insertMany(newUserListForSaveInDatabase)
                return newUserIdList
            })
    }

}