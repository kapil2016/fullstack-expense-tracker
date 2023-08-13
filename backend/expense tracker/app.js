const Express = require('express')
const sequelize = require('./database/database')
const User = require('./modal/user')
const Order = require('./modal/order')
const PasswordResetRequest = require('./modal/password-reset')
const expensesRoutes = require('./routes/expenses')
const authRoutes = require('./routes/user_auth')
const paymentRoutes = require('./routes/payment')
const premiumRoutes = require('./routes/premium')
const passwordRoutes = require('./routes/forgot_password')
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const cors = require('cors');
const Expense = require('./modal/expense');
const app = Express();
app.use(cors())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(publicPath));
app.use('/expenses', expensesRoutes);
app.use(authRoutes)
app.use(paymentRoutes)
app.use(premiumRoutes)
app.use(passwordRoutes)

User.hasMany(Expense)
User.hasMany(Order);
User.hasMany(PasswordResetRequest)
PasswordResetRequest.belongsTo(User)
Order.belongsTo(User)
Expense.belongsTo(User)

sequelize.sync().then(result => {
    app.listen(3000)
}).catch(err => console.log(err))






