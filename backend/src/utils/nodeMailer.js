import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.APP_PASSWORD
    }
});

const sendMail = async (
    to,
    subject,
    text,
    html = '<div>This is HTML</div>'
) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Mail sent successfully:', info.messageId);

        return info;
    } catch (err) {
        console.error('Error in mail sending:', err.message);
        throw err;
    }
};

export default sendMail;