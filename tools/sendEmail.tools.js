const nodemailer = require('nodemailer');
const { getListOfRecivers } = require('./updateSentEmail.tools');

async function sendEmail(emailData, listOfUsersThatSaveInDatabase) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "mail.akamnet.com",
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: "reza.m@akamnet.com",
            pass: "2sH15dMfg6"
        },
    })
    let info = await transporter.sendMail({
        from: 'reza.m@akamnet.com', // sender address
        to: emailData.emails, // list of receivers
        subject: emailData.title, // Subject line
        text: emailData.message, // plain text body
    });
    const listOfAcceptedEmail = info.accepted
    await getListOfRecivers(listOfAcceptedEmail, listOfUsersThatSaveInDatabase)

}
module.exports = sendEmail 