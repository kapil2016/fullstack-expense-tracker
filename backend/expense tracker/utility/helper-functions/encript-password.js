const bcrypt = require('bcrypt');
exports.encript = async(password)=>{
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword ;
}