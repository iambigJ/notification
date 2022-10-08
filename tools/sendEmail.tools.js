const nodemailer = require('nodemailer');
const { getListOfRecivers } = require('./updateSentEmail.tools');

async function sendEmail(emailData, listOfUsersThatSaveInDatabase) {
    let transporter = nodemailer.createTransport({
        host: appConfigs.mail.host,
        port: appConfigs.mail.port,
        secure: appConfigs.mail.secure,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: appConfigs.mail.user,
            pass: appConfigs.mail.password
        },
    });

    let info = await transporter.sendMail({
        from: appConfigs.mail.user, // sender address
        
        to: emailData.emails, // list of receivers
        subject: emailData.title, // Subject line
        text: emailData.message, // plain text body
    });
    const listOfAcceptedEmail = info.accepted
    await getListOfRecivers(listOfAcceptedEmail, listOfUsersThatSaveInDatabase)

}
module.exports = sendEmail 