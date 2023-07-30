const jwt = require('jsonwebtoken');
const User = require('../../modal/user')
const secretKey = 'uskdkljakakjadkljaliwjodsjlajd11123nskasdk'

exports.authanticate = (req, res, next) => {
    const idToken = req.headers['authorization']
    console.log(idToken, 'this is a id token')
    if (!idToken) {
        return res.status(403).json({ error: 'No token provided' });
    }
    jwt.verify(idToken, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // If the token is valid, save the decoded information in the request object for later use
        const id = decoded.userId
        User.findByPk(id).then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log(err);
            return res.status(404).json({ message: 'somthing went wrong' })
        })
    });
}