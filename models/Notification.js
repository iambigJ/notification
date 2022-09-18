const mongoose = require("mongoose")

const schema = mongoose.Schema

const notificationSchema = schema({
    user: {
        userId: {
            type: String
        },
        push_notification_token: {
            endpoint: {
                type: String
            },
            expirationTime: {
                type: String,
                default: null
            },
            keys: {
                auth: {
                    type: String
                },
                p256dh: {
                    type: String
                }
            }
        }
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    push_notification_service: {
        type: String,
        enum: ['google'],
        default: 'google'
    }
}, {
    timestamps: true,
    collection: 'notification'
})


module.exports = mongoose.model('Notification', notificationSchema);