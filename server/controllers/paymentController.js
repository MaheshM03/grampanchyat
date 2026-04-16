const crypto = require('crypto');
const razorpayConfig = require('../config/razorpay');

// @desc Verify Razorpay payment signature
exports.verifyPayment = async (req, res = null) => {
  try {
    const { body } = req;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    const shasum = crypto.createHmac('sha256', razorpayConfig.key_secret);
    shasum.update(razorpay_payment_id + '|' + razorpay_order_id);
    const expectedSignature = shasum.digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (res) {
      return res.status(isValid ? 200 : 400).json({
        success: isValid,
        message: isValid ? 'Payment verified' : 'Invalid payment signature',
        payment_id: razorpay_payment_id
      });
    }

    return { success: isValid, payment_id: razorpay_payment_id };
  } catch (error) {
    console.error('Payment verification error:', error);
    if (res) {
      return res.status(500).json({ success: false, message: 'Verification error' });
    }
    return { success: false };
  }
};

// @desc Create Razorpay order (client-facing)
exports.createOrder = async (req, res) => {
  try {
    const Razorpay = require('razorpay');
    const rzp = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret: razorpayConfig.key_secret,
    });

    const { amount, currency = 'INR', receipt, notes = {} } = req.body;

    const options = {
      amount: amount * razorpayConfig.amountMultiplier,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes
    };

    const order = await rzp.orders.create(options);

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayConfig.key_id
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

