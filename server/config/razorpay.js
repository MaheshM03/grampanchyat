// Razorpay Configuration
//  TODO: Replace with your TEST keys from https://dashboard.razorpay.com/app/keys

module.exports = {
  key_id: 'rzp_test_YOUR_KEY_ID', 
  key_secret: 'YOUR_KEY_SECRET',
  
  // Test mode URLs (change to live in production)
  webhook_secret: 'whsec_YOUR_WEBHOOK_SECRET', // Optional for now
  
  // Amount multiplier (paisa)
  amountMultiplier: 100,
  
  // Success/error URLs (relative)
  success_url: '/certificates/success',
  error_url: '/certificates/error'
};

