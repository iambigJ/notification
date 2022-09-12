const mongoose = require("mongoose")

const schema = mongoose.Schema

const notificationSchema = schema({
    userId: {
        type: String
    },
    messageType: {
        type: String,
        enum: ['email', 'push_notification', 'inside_message'],
        default: 'inside_message'
    },
    email: {
        type: String
    },
    push_message: {
        type: String
    },
    message: {
        type: String
    },
    isSent: {
        type: Date,
        default: null
    },
    seen: {
        type: Date,
        default: null
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