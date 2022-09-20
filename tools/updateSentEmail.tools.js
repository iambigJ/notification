const EmailMessages = require("../models/EmailMessages")



exports.getListOfRecivers = async (listOfAcceptedEmail, listOfUsersThatSaveInDatabase) => {
    const newListOfAcceptedEmail = []
    for (user of listOfUsersThatSaveInDatabase) {
        if (listOfAcceptedEmail.includes(user.user.email)) {
            newListOfAcceptedEmail.push(user._id)
        }
        await EmailMessages.updateMany(
            { _id: { $in: newListOfAcceptedEmail } },
            { $set: { sent: true, delivery: true, sent_date: new Date() } },
            { multi: true }
        )
    }
}