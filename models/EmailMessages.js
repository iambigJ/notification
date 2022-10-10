const mongoose = require("mongoose")

const schema = mongoose.Schema

const emailMessageSchema = schema({
    user: {
        userId: { type: String },
        email: { type: String }
    },
    title: { type: String },
    message: { type: String },
    groupId: { type: String, },
    sent_date: { type: Date, default: null },
    sent: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    moreData: { type: Object },
}, {
    timestamps: true,
    collection: 'emailMessages'
})


module.exports = mongoose.model('EmailMessages', emailMessageSchema);