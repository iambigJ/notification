const express = require('express')
const path = require("path")
const app = express()
const webPush = require("web-push")
const fetch = require("node-fetch")

app.use(express.static(path.join(__dirname, '../client')))



const publicVapidKey = 'BDeaF_-6Kf_5nIoDDPVZeERUPQkjUrdq682lc-0lp4ArC9OVWuVa8Dq7l4Gq0DatO7Lvj5T6F6nFhJFc5EHCTEI'
const privateVapidKeys = 'wVnsINkjLjWSOIWM_NZZYC-YwCpVb2SNNrBHugFTPIs'



webPush.setVapidDetails("mailto:rmussavi@gmail.com", publicVapidKey, privateVapidKeys)



app.post('/subscribe', async (req, res) => {
    var notification = {
        'title': "Title of notification",
        "text": "Subtitle"
    }

    var fcm_token = []

    var notification_body = {
        "notification": notification,
        "registration_ids": fcm_token
    }

    await fetch("/subscribe", {
        'method': 'POST',
        'headers': {},
        'body':
    })
})

app.listen(3000, () => { console.log('connect to 3000') })