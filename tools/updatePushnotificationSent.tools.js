const Notification = require("../models/Notification")

exports.getListOfpushNotificationRecivers = async (listOfIdsThatSentNotification) => {
    await Notification.updateMany(
        { _id: { $in: listOfIdsThatSentNotification } },
        { $set: { sent: true, delivery: true, sent_date: new Date() } },
        { multi: true }
    )
}