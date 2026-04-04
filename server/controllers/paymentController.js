const Razorpay = require('razorpay');
const crypto = require('crypto');
const config = require('../config/razorpay');

const rzp = new Razorpay({
  key_id: config.key_id,
  key_secret: config.key_secret,
});

// @desc Create Razorpay order for certificate payment
// @route POST /api/payment/order
const createOrder = async (req, res) => {
  try {
    const { amount, certificateType = 'certificate', mobile = '' } = req.body;
    
    if (!amount || amount !== 20) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be exactly ₹20'
      });
    }

    const orderAmount = amount * config.amountMultiplier; // Convert to paise

    const order = await rzp.orders.create({
      amount: orderAmount,
      currency: 'INR',
      receipt: `cert_${certificateType}_${Date.now()}`,
      notes: {
        certificate_type: certificateType,
        mobile: mobile,
        fee: '₹20 - Gram Panchayat Certificate'
      }
    });

    res.status(201).json({
      success: true,
      data: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: config.key_id,
        name: 'Kadepur Gram Panchayat',
        description: `${certificateType.toUpperCase()} Application Fee`,
        prefill: { 
          name: 'Citizen', 
          contact: mobile || undefined 
        },
        notes: order.notes,
        theme: { color: '#2d8a6e' },
        modal: { ondismiss: () => { /* handle dismiss */ } }
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment order creation failed'
    });
  }
};

// @desc Verify payment signature (client calls after success)
// @route POST /api/payment/verify  
const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      certificateType 
    } = req.body;

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', config.key_secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          verified: true
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification error'
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment
};

