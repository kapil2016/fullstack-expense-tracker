const express = require('express')
const router = express.Router();
const authController = require('../controllers/user_auth')

router.post('/signup',authController.signUp)
// router.post('/login',authController.createNewExpense)

module.exports = router ;