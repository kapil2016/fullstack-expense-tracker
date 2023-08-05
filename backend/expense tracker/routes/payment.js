const express = require('express');
const router = express.Router();
const userAuth = require('../utility/midilewares/authanticate');

const paymentController = require('../controllers/payment');
router.post('/create-order',userAuth.authanticate,paymentController.createOrder) ;
router.post('/verify-payment',userAuth.authanticate,paymentController.verfyPayment);



module.exports = router ;