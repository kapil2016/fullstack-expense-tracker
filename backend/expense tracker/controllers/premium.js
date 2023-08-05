const User = require('../modal/user')
exports.getLeaderBoard = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user.ispremium) {
            throw new Error('bad request user is not premium')
        }
        const users = await User.findAll({
            attributes: ['email', 'totalamount'],
        });
        const sortedUsers = users.sort((b, a) => a.totalamount - b.totalamount);
        res.json(sortedUsers);

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