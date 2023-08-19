const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken')

exports.genrateToken = (payload)=>{
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    return token ;
}