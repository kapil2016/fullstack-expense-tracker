const nodemailer = require('nodemailer');
const SMTP_SERVER = process.env.SMTP_SERVER
const SMTP_USER = process.env.SMTP_USER 
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,   // Replace with your SMTP server address
  port: 587,                      // Replace with your SMTP server port
  secure: false,                  // Set to true if you're using SSL/TLS
  auth: {
    user: SMTP_USER,    // Your email address
    pass: SMTP_PASSWORD,       // Your email password
  },
});

module.exports = transporter;
