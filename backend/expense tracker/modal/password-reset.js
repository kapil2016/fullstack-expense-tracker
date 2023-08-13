const Sequelize = require('sequelize');
const sequelize = require('../database/database')

const PasswordResetRequest = sequelize.define('passwordresetrequests', {
    uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isactive: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = PasswordResetRequest;