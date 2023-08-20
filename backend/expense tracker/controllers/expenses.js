const Expense = require('../modal/expense');
const sequelize = require('../database/database') ;

exports.getAllExpenses = async(req, res, next) => {
    const user = req.user;
    const page = +req.query.page || 1 ;
    const size = +req.query.size || 3 ;
    try{
        const count = await Expense.count({where:{userid:user.id}})
        console.log(page , size , count)
        const expenses = await user.getExpenses({offset:(page-1)*size , limit:size})
        console.log(page , size , count , expenses)
        res.json({expenses , maxPageCount:Math.ceil(count/size) , count})

    }catch(err){
        res.status(500).json(err)
    }
}

exports.createNewExpense = async (req, res, next) => {
    // console.log(req.body, 'this is req')
    const t = await sequelize.transaction();
    const user = req.user;
    const { title, amount, date, category } = req.body;
    try {
        const result = await user.createExpense({
            date: date,
            title: title,
            amount: amount,
            category: category
        },{transaction:t})
        if (!user.totalamount) {
            user.totalamount = Number(amount);
            const cat = category;
            user[cat] = Number(amount);
        } else {
            user.totalamount = Number(user.totalamount) + Number(amount)
            const cat = category;
            user[cat] = Number(user[cat]) + Number(amount);
        }
        await user.save({transaction:t});
        await t.commit();
        res.json(result)
    } catch (error) {
        await t.rollback();
        res.status(500).json(err)
    }
}

exports.updateExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const id = req.params.id
    const user = req.user;
    const updatedDetails = req.body;
    try {
        const expense = await Expense.findByPk(id);
        user.totalamount = Number(user.totalamount) - Number(expense.amount) + Number(updatedDetails.amount);
        const cat = updatedDetails.category;
        user[cat] = Number(user[cat]) - Number(expense.amount) + Number(updatedDetails.amount);
        await user.save({transaction:t});
        expense.title = updatedDetails.title;
        expense.amount = updatedDetails.amount;
        expense.date = updatedDetails.date;
        expense.category = updatedDetails.category;
        const result = await expense.save({transaction:t});
        await t.commit();
        res.json(result)
    } catch (error) {
        await t.rollback();
        res.status(500).json(error)
    }

}

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const id = req.params.id;
    const user = req.user;
    try {
        const expense = await Expense.findByPk(id);
        const cat = expense.category;
        user[cat] = Number(user[cat]) - Number(expense.amount);
        user.totalamount = Number(user.totalamount) - Number(expense.amount)
        await user.save({transaction:t});
        await expense.destroy({transaction:t});
        await t.commit();
        res.json({})
    } catch (error) {
        await t.rollback();
        res.status(404).json(error)
    }
}


