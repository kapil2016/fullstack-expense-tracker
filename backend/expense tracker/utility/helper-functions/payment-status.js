const Razorpay = require('razorpay')

const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET


const getPaymentStatus = async (orderId) => {
  try {
    var instance = new Razorpay({ key_id: RAZORPAY_API_KEY, key_secret: RAZORPAY_KEY_SECRET})
    const response = await instance.orders.fetch(orderId)
    return response.status ;
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
  }
};

module.exports = getPaymentStatus ;
