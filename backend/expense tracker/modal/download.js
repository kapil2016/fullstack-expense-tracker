const Sequelize = require('sequelize');
const sequelize = require('../database/database')

const Download = sequelize.define('download',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    name:Sequelize.STRING ,
    url:Sequelize.STRING,
    date:Sequelize.STRING
})

module.exports = Download ;