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
        }).catch(err => console.log(err))
}














































// // const fetch = require("node-fetch")
// app.use(express.json())
// app.use(express.static(path.join(__dirname, '../client')))

// const PUBLIC_VAPID_KEY = 'BD1Zf7bN4Hyso4YXAmKJiUuIE7teESslRoEGbZhKyvEfxuPs92YDvG-Fwaig6_WZ2IjVUDv07m_VRBpm6dFrwZI'
// const PRIVATE_VAPID_KEY = 'TA3typPc09Q4fcEHMKcWew9PgRmrPmyyNpoOCSfCy0g'

// webPush.setVapidDetails("mailto:rmussavi@gmail.com", PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)


// app.post('/api/subscribe', async (req, res) => {
//     const subscription = req.body
//     console.log(1)
//     console.log(subscription)
//     const sub = {
//         endpoint: subscription.endpoint,
//         expirationTime: null,
//         keys: {
//             auth: subscription.auth,
//             p256dh: subscription.p256dh,
//         }
//     };
//     res.status(200).json({})
//     const payload = JSON.stringify({
//         title: "New Product Available"
//     })
//     webPush.sendNotification(sub, payload).catch(err => {

//     })
// })


// app.listen(3000, () => { console.log('connect to 3000') })