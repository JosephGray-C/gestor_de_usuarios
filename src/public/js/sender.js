import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
    {
        secure: true, 
        host: "smtp.gmail.com", 
        port: 465,     
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
        text: msg,
        attachments: [{
            filename: 'image.png',
            path: 'src/public/img/logo_correo.png',
            cid: 'unique@nodemailer.com' //same cid value as in the html img src
        }]
       
    });
    console.log("Email sent successfully!");
    console.log("To: ", to);
}

// sendMail("volcanodesarrollo@gmail.com", "Test Subject", "Test Message, I use vim"); 