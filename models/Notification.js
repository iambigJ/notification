const mongoose = require("mongoose")

const schema = mongoose.Schema

const notificationSchema = schema({
    users: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    type: {
        type: String,
        enum: ['push_notification'],
        default: 'push_notification'
    },
    message: {
        type: String
    },
    sent_date: {
        type: Date,
        default: null
    },
    sent: {
        type: Boolean,
        default: false
    },
    push_notification_service: {
        type: String,
        enum: ['google'],
        default: 'google'
    },
    push_notification_token: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'notification'
})


module.exports = mongoose.model('Notification', notificationSchema);