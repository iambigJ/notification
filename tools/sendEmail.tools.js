const nodemailer = require('nodemailer');
const { getListOfRecivers } = require('./updateSentEmail.tools');

async function sendEmail(emailData, listOfUsersThatSaveInDatabase) {
    let transporter = nodemailer.createTransport({
        host: appConfigs.Mail.host,
        port: appConfigs.Mail.port,
        secure: appConfigs.Mail.secure === "true",
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: appConfigs.Mail.user,
            pass: appConfigs.Mail.password
        },
    });

    let info = await transporter.sendMail({
        from: appConfigs.Mail.user, // sender address
        
        to: emailData.emails, // list of receivers
        subject: emailData.title, // Subject line
        html: emailData.message, // plain text body
    });

    const listOfAcceptedEmail = info.accepted;
    await getListOfRecivers(listOfAcceptedEmail, listOfUsersThatSaveInDatabase);
}
module.exports = sendEmail;