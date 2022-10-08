const webPush = require("web-push/src");
const { getListOfpushNotificationRecivers } = require("./updatePushnotificationSent.tools");

webPush.setVapidDetails(appConfigs.MAIL_TO, appConfigs.PUBLIC_VAPID_KEY, appConfigs.PRIVATE_VAPID_KEY);

exports.pushNotification = async (listOfUsersThatSaveInDatabase) => {
    var listOfAcceptes = []
    const payload = JSON.stringify({ title: appConfigs.title });

    for (let subscription of listOfUsersThatSaveInDatabase) {
        try {
            const sendNotification = await webPush.sendNotification(subscription.user.push_notification_token, payload)
            listOfAcceptes.push({ ...sendNotification, id: subscription._id })
        } catch (error) {
            console.log("/* ----------------------- ERROR IN PUSH NOTIFICATION ----------------------- */")
            console.log(error)
        }
    }

    Promise.allSettled(listOfAcceptes)
        .then(async res => {
            const listOfIdsThatSentNotification = []
            for (notification of res) {
                listOfIdsThatSentNotification.push(notification.value.id)
            }
            console.log(listOfIdsThatSentNotification)
            await getListOfpushNotificationRecivers(listOfIdsThatSentNotification)
        }).catch(err => {
            console.log("/* ----------------------- ERROR IN PUSH NOTIFICATION ----------------------- */")
            console.log(err)
        })
}