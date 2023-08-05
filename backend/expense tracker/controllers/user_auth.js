const User = require('../modal/user')
const encriptPassword = require('../utility/helper-functions/encript-password');
const bcrypt = require('bcrypt');
const idToken = require('../utility/helper-functions/genrate-idToken')

exports.login = async (req, res, next) => {
    const { email, password } = req.body.data;
    // console.log(req.body.data);
    const users = await User.findAll({ where: { email: email } })
    const user = users[0]
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.status(200).json({ message: 'Login successful' , registerd:true , idToken:idToken.genrateToken({userId:user.id}) , isPremium:user.ispremium});
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login' });
    }
}

exports.signUp = async (req, res, next) => {
    const { email, password } = req.body.data;
    try {
        const users = await User.findAll({ where: { email: email } });
        if (users[0]) {
            res.status(409).json({ error: 'user already exist' })
        } else {
            const encriptedPassword = await encriptPassword.encript(password)
            await User.create({ email: email, password: encriptedPassword , isPremium:false })
            res.status(200).json({message:'user register successfully'});
        }
    } catch (err) {
        res.json(err)
    }
}


