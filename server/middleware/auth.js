const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'grampanchayat-admin-secret-key-change-in-prod';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.adminToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token, admin authorization required' });
    }

    const decoded = jwt.verify(token, SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

