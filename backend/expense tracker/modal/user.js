const Sequelize = require('sequelize');
const sequelize = require('../database/database')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password:{
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = User;