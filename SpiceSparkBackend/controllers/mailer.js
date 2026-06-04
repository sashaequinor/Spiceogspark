const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
  },
});

module.exports = transporter;