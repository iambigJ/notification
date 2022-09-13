const nodemailer = require('nodemailer');

async function main(emailData) {
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
    // let info = await transporter.sendMail({
    //     from: 'reza.m@akamnet.com', // sender address
    //     to: "<rmussavi@gmail.com>", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });
    console.log(emailData.emails)
    let info = await transporter.sendMail({
        from: 'reza.m@akamnet.com', // sender address
        to: emailData.emails, // list of receivers
        subject: emailData.title, // Subject line
        text: emailData.message, // plain text body
    });

}
module.exports = main 