const express = require('express') ;
const router = express.Router() ;
const passwordController = require('../controllers/forgot_password')

router.post('/forgot-password' ,passwordController.forgotPassword);
router.post('/reset-password/:uuid',passwordController.resetPassword);

module.exports = router ;