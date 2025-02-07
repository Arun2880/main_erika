const nodemailer = require('nodemailer');
require('dotenv').config({path: '../../mail.env'})


const SendEmail =(req,res)=>{
  const {email,subject,message}=req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.example.com
    port: process.env.SMTP_PORT, // e.g., 587 or 465
    secure: process.env.SMTP_SECURE === 'false', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or App Password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL, // Recipient's email
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });

}
  module.exports={SendEmail};