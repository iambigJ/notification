const { v4: uuidv4 } = require("uuid")
const Notification = require('../models/Notification')
const InsideMessages = require('../models/InsideMessages')
const EmailMessages = require('../models/EmailMessages')
const GetToken = require("../models/GetToken")
const sendEmail = require('../tools/sendEmail.tools')
const { pushNotification } = require('../tools/pushNotification.tools')


/* ----------------------------- GET MESSAGES LIST ----------------------------- */
exports.geMessagesList_Services = async (queries) => {

    const match = {}
    if (queries.userId) {
        match['user.userId'] = queries.userId
    }
    if (queries.email) {
        match.email = { $regex: queries.email }
    }
    if (queries.seen) {
        match.seen = queries.seen
    }
    if (queries.sent) {
        match.sent = queries.sent
    }
    if (queries.groupId) {
        match.groupId = queries.groupId
    }
    if (queries.fromDate) {
        match.createdAt = { $gte: new Date(queries.fromDate) }
    }
    if (queries.toDate) {
        match.createdAt = { $lte: new Date(queries.toDate) }
    }
    if (queries.fromDate && queries.toDate) {
        match.createdAt = { $gte: new Date(queries.fromDate), $lte: new Date(queries.toDate) }
    }

    let modelToSearch = null;
    let getMessages = [];
    let total = 0;

    if (queries.type === "email") modelToSearch = EmailMessages;
    else if (queries.type === "inside_message") modelToSearch = InsideMessages;
    else if (queries.type === "push_notification") modelToSearch = Notification;

    if(modelToSearch){
        getMessages = await modelToSearch
            .find(match)
            .limit(queries.take)
            .skip(queries.page * queries.take)
            .sort({ createdAt: queries.sort });

        total = await modelToSearch.countDocuments(match);
        if(queries.updateSeen){
            await modelToSearch.updateMany(
                { _id: { $in: getMessages.map(item => item._id.toString()) }, seen: false },
                { $set: { seen: true, seen_date: new Date() } },
            )
        }
    }

    return { getMessages, total }
}

/* -------------------------- SEND MESSAGE TO USER -------------------------- */
exports.addNewMessage_Services = async (informationBodyTaken) => {
    const uniqueCode = uuidv4()

    var newUserIdList = []
    // type was email
    if (informationBodyTaken.type === "email") {
        var emails = []
        for (user of informationBodyTaken.user) {
            emails.push(user.email)
            newUserIdList.push({
                ...informationBodyTaken,
                groupId: uniqueCode,
                user: { userId: user.userId, email: user.email },
                moreData: informationBodyTaken.moreData,
            })
        }
        const listOfUsersThatSaveInDatabase = await EmailMessages.insertMany(newUserIdList)
        const emailData = {
            emails: emails,
            title: informationBodyTaken.title,
            message: informationBodyTaken.message,
        }

        sendEmail(emailData, listOfUsersThatSaveInDatabase).catch(err => console.log(err))

        return listOfUsersThatSaveInDatabase;
    }
    else if (informationBodyTaken.type === "push_notification") {
        appConfigs.title = informationBodyTaken.title;
        appConfigs.message = informationBodyTaken.message;

        const newListForSaveInDatabase = []
        for (token of informationBodyTaken.user) {
            newListForSaveInDatabase.push({
                ...informationBodyTaken,
                groupId: uniqueCode,
                moreData: informationBodyTaken.moreData,
                user: {
                    userId: token.userId,
                    push_notification_token: token.push_notification_token
                }
            });
        }
        const listOfUsersThatSaveInDatabase = await Notification.insertMany(newListForSaveInDatabase);

        pushNotification(listOfUsersThatSaveInDatabase);

        return listOfUsersThatSaveInDatabase;
    }
    else if (informationBodyTaken.type === "inside_message") {
        const newUserListForSaveInDatabase = [];
        for (user of informationBodyTaken.user) {
            newUserListForSaveInDatabase.push({
                ...informationBodyTaken,
                groupId: uniqueCode,
                moreData: informationBodyTaken.moreData,
                user: { userId: user.userId, email: user.email }
            });
        }
        const response = await InsideMessages.insertMany(newUserListForSaveInDatabase);
        return response;
    }
}

/* ------------------------ Create token from client ------------------------ */
exports.createTokenFromClient_Services = async (token) => {

    const response = new GetToken(token)
    await response.save()
    return response
}