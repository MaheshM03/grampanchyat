const logoutController = (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = logoutController;

