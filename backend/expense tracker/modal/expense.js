const Sequelize = require('sequelize');
const sequelize = require('../database/database')

const Expense = sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    title: Sequelize.STRING,
    amount: Sequelize.DOUBLE,
    date:Sequelize.STRING,
    category:Sequelize.STRING
})

module.exports = Expense ;