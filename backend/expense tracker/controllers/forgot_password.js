const transporter = require('../utility/mail-transporter/transport')
const { v4: uuidv4 } = require('uuid');
const User = require('../modal/user');
const PasswordResetRequest = require('../modal/password-reset')
const encriptPassword = require('../utility/helper-functions/encript-password')


exports.forgotPassword = async (req, res, next) => {
    const email = req.body.email
    const uniqueUserId = uuidv4();
    try {
        const user = await User.findOne({ where: { email: email } })
        await user.createPasswordresetrequest({ uuid: uniqueUserId, isactive: true })
        const mailOptions = {
            from: 'kapilkumardu.ramjas@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `Click <a href="http://localhost:5173/reset-password/${uniqueUserId}">here</a> to reset your password.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(404).json(`error: ${error}`)
            } else {
                res.json({ message: 'email sent successfully please check your mail' })
            }
        });

    } catch (error) {
        console.log(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    const uuid = req.params.uuid;
    try {
        const password = await encriptPassword.encript(req.body.password);
        const request = await PasswordResetRequest.findOne({
            where: { uuid: uuid }
        })
        if (!request.isactive) {
            throw new Error('link is not active')
        }
        const userId = request.userId;
        const user = await User.findOne({ where: { id: userId } });
        user.password = password;
        request.isactive = false;
        await user.save();
        await request.save();
        res.json({ message: 'password changed successfully' })
    } catch (error) {
        console.log(error)
    }
}