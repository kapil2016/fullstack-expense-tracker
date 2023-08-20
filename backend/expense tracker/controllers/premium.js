const User = require('../modal/user')
const s3 = require('../services/uploadtos3')
const Download = require('../modal/download')
exports.getLeaderBoard = async (req, res, next) => {
    const user = req.user;
    const page = +req.query.page || 1 ;
    const size = +req.query.size || 10 ;
   
    try {
        if (!user.ispremium) {
            throw new Error('bad request user is not premium')
        }
        const count = await User.count();
        const users = await User.findAll({
            attributes: ['email', 'totalamount'],
            offset:(page-1)*size,
            limit:size
        });
        const sortedUsers = users.sort((b, a) => a.totalamount - b.totalamount);
        res.json({users:sortedUsers , maxPageCount:Math.ceil(count/size) , count});

    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getCategory = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user.ispremium) {
            throw new Error('bad request user is not premium')
        }
        const response = [{ name: 'fule', value: user.fule }, { name: 'food', value: user.food }, { name: 'other', value: user.other }, { name: 'bills', value: user.bills }]
        res.json(response);

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getExpenseReport = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user.ispremium) {
            throw new Error('bad request user is not premium')
        }
        const expenses = await user.getExpenses();
        const stringfyedExpenses = JSON.stringify(expenses);
        const filename = `expenses/${user.id}/expense${Date.now()}.txt`
        const url = await s3.uploadToS3(filename, stringfyedExpenses)
        await user.createDownload({ name: `expense-${Date.now()}`, url: url , date: `${new Date()}`})
        res.json({ url, success: true })

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getDownloads = async (req,res,next)=>{
    const user = req.user;
    const page = +req.query.page || 1 ;
    const size = +req.query.size || 10 ;
    try {
        if (!user.ispremium) {
            throw new Error('bad request user is not premium')
        }
        const count = await Download.count({where:{userid:user.id}}) ;
        const downloads = await user.getDownloads({offset:(page-1)*size , limit:size })
        res.json({downloads , maxPageCount:Math.ceil(count/size) , count})
    } catch (error) {
        res.status(500).json(error)
    }

}

