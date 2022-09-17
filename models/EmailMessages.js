const mongoose = require("mongoose")

const schema = mongoose.Schema

const emailMessageSchema = schema({
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
        enum: ['email'],
        default: 'email'
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
    }
}, {
    timestamps: true,
    collection: 'emailMessages'
})


module.exports = mongoose.model('EmailMessages', emailMessageSchema);