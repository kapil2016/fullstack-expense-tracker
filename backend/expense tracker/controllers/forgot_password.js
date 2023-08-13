const transporter = require('../utility/mail-transporter/transport')

exports.forgotPassword = (req , res , next)=>{
    const email = req.body.email
    
    const mailOptions = {
        from: 'kapilkumardu.ramjas@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="http://yourapp.com/reset/">here</a> to reset your password.`,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(404).json(`error: ${error}`)
        } else {
          res.json({message:'email sent successfully please check your mail'})
        }
      });

      
}