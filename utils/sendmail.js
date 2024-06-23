import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
// import ENV from '../config.js';
import env from 'dotenv';
env.config();


export const mailSender = async (email , title , body) => {
    try {
        let transporter =nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD, // generated ethereal password
            }
        })

        let info = await transporter.sendMail({
            from:"Akgram || by Akshay Nayani" ,
            to: `${email}`,
            subject : `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
    }
    catch (error)
    {
        console.log(error.message);
    }
}
