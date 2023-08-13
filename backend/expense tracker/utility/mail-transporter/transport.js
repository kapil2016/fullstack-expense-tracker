const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',   // Replace with your SMTP server address
  port: 587,                      // Replace with your SMTP server port
  secure: false,                  // Set to true if you're using SSL/TLS
  auth: {
    user: 'kapilkumardu.ramjas@gmail.com',    // Your email address
    pass: 'Z3CLgSIF7x8nOvb4',       // Your email password
  },
});

module.exports = transporter;
