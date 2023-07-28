const User = require('../modal/user')

exports.signUp = (req, res, next) => {
    const { email, password } = req.body.body;
    console.log(req.body);
    User.findAll({ where: { email: email } }).then(users => {
        if (users[0]) {
            res.status(409).json({error:'user already exist'})
        } else {
            return User.create({ email: email, password: password })
        }
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
}


