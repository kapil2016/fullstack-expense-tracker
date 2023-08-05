const axios = require('axios');
const Razorpay = require('razorpay')

const razorpayApiKey = 'rzp_test_8r8KzW3gOUvR8E';
const keySecret = 'MtjSDzFskBAt8s8LjjmkG7Qp'


const getPaymentStatus = async (orderId) => {
  try {
    var instance = new Razorpay({ key_id: razorpayApiKey, key_secret: keySecret})
    const response = await instance.orders.fetch(orderId)
    return response.status ;
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
  }
};

module.exports = getPaymentStatus ;
