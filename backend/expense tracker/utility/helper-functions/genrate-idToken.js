const secretKey = 'uskdkljakakjadkljaliwjodsjlajd11123nskasdk';
const jwt = require('jsonwebtoken')

exports.genrateToken = (payload)=>{
    const token = jwt.sign(payload, secretKey);
    return token ;
}