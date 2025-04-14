import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
    {
        secure: true, // true for 465, false for other ports
        host: "smtp.gmail.com", // Replace with your SMTP server
        port: 465, // Replace with your SMTP port     
        auth:{
            user:'jlgrayc@gmail.com',
            pass:'qxnx rgtp tvvf neja'
        }
    }
);

export const sendMail = (to, sub, msg) => {
    transporter.sendMail({ 
        to: to,
        subject: sub,
        text: msg
    });
    console.log("Email sent successfully!");
    console.log("To: ", to);
}

// sendMail("volcanodesarrollo@gmail.com", "Test Subject", "Test Message, I use vim"); 