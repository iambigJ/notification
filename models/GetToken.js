const mongoose = require("mongoose")

const schema = mongoose.Schema

const getTokenSchema = schema({

}, {
    strict: false,
    collection: 'get_token'
})


module.exports = mongoose.model('GetToken', getTokenSchema);