const mongoose = require("mongoose")

const schema = mongoose.Schema

const insideMessageSchema = schema({
    user: {
        userId: {
            type: String
        },
        email: {
            type: String
        }
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    groupId: {
        type: String,
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