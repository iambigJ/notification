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
        enum: ['email', 'push_notification', 'inside_message'],
        default: 'inside_message'
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
    seen_date: {
        type: Date,
        default: null
    },
    seen: {
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