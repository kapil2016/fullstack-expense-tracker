const Express = require('express')
const sequelize = require('./database/database')
const User = require('./modal/user')
const expensesRoutes = require('./routes/expenses')
const authRoutes = require('./routes/user_auth')
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const cors = require('cors') ;
const Expense = require('./modal/expense');
const app = Express();
app.use(cors())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(publicPath));
app.use('/expenses',expensesRoutes);
app.use(authRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)


sequelize.sync().then(result=>{
    app.listen(3000)
}).catch(err=>console.log(err))





