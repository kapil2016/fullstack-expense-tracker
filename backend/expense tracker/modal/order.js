const Sequelize = require('sequelize');
const sequelize = require('../database/database')

const Order = sequelize.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    order_id: Sequelize.STRING,
    payment_id: Sequelize.STRING,
    status:Sequelize.STRING,
})

module.exports = Order ;