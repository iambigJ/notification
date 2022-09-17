const mongoose = require("mongoose")

const schema = mongoose.Schema

const insideMessageSchema = schema({
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
        enum: ['inside_message'],
        default: 'inside_message'
    },
    message: {
        type: String
    },
    seen_date: {
        type: Date,
        default: null
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'inside_messages'
})


module.exports = mongoose.model('InsideMessages', insideMessageSchema);