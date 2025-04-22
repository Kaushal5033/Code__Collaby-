import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendMail = async (to, subject, text, html = '<div>This is HTML</div>') => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL, // Use the sender's email from environment variables
            pass: process.env.APP_PASSWORD   // Use the app password here instead of your Gmail account password
        }
    });

    let mailOptions = {
        from: process.env.SENDER_MAIL,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error in mail sending', err, err.message)
        }
        console.log('Mail sent successfully')
    })
}

export default sendMail