const express = require('express')
const path = require("path")
const app = express()
const webPush = require("web-push")


const publicVapidKey = 'BD1Zf7bN4Hyso4YXAmKJiUuIE7teESslRoEGbZhKyvEfxuPs92YDvG-Fwaig6_WZ2IjVUDv07m_VRBpm6dFrwZI'
const privateVapidKeys = 'TA3typPc09Q4fcEHMKcWew9PgRmrPmyyNpoOCSfCy0g'
webPush.setVapidDetails("mailto:rmussavi@gmail.com", publicVapidKey, privateVapidKeys)


exports.pushNotification = async () => {
    const subscription = {
        endpoint: appConfigs.endpoint,
        expirationTime: null,
        keys: {
            auth: appConfigs.auth,
            p256dh: appConfigs.p256dh
        }
    };

    const payload = JSON.stringify({
        title: "New Product From Akam",
    })

    webPush.sendNotification(subscription, payload).catch(err => {
        console.log(err)
    })

}














































// // const fetch = require("node-fetch")
// app.use(express.json())
// app.use(express.static(path.join(__dirname, '../client')))

// const publicVapidKey = 'BD1Zf7bN4Hyso4YXAmKJiUuIE7teESslRoEGbZhKyvEfxuPs92YDvG-Fwaig6_WZ2IjVUDv07m_VRBpm6dFrwZI'
// const privateVapidKeys = 'TA3typPc09Q4fcEHMKcWew9PgRmrPmyyNpoOCSfCy0g'

// webPush.setVapidDetails("mailto:rmussavi@gmail.com", publicVapidKey, privateVapidKeys)


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