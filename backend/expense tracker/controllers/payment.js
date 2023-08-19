const Razorpay = require('razorpay');
const Order = require('../modal/order')
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res, next) => {
  try {
    const amount = 10000; // Amount in paise (e.g., 10000 paise = Rs 100)
    const currency = 'INR';

    // Create an order
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: 'order_receipt', // You can customize this receipt ID
      payment_capture: 1, // Auto-capture payments
    });
    await req.user.createOrder({ order_id: order.id, status: order.status });
    res.json({ order }); // Return the order details to the client-side
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.verfyPayment = async (req, res,next) => {
  console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  try {
    const order = await Order.findOne({ where: { order_id: razorpay_order_id, userId:req.user.id } });
    if (!order) {
      console.log('Order not found for the user.');
      return;
    }

     // Update the order with the provided data
     req.user.ispremium = true ;
     await req.user.save();
     order.status = 'paid' ;
     order['payment_id'] = razorpay_payment_id
    //  Object.assign(order, {status:'paid' , payment_id:razorpay_payment_id}); // Merge the updatedData into the order object
     await order.save(); // Save the updated order to the database
     res.json({ message: 'Payment successful' , isPremium:req.user.ispremium })
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}  