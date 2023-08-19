const Sequelize = require('sequelize');
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME ;
const DATABASE_HOST = process.env.DATABASE_HOST ;
const sequelize = new Sequelize('expense_tracker',DATABASE_USERNAME,DATABASE_PASSWORD,{
    dialect:'mysql',
    host:DATABASE_HOST
}) ;

module.exports = sequelize ;
