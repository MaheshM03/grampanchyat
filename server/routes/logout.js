const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const authMiddleware = require('../middleware/auth');

router.post('/logout', (req, res, next) => authMiddleware(req, res, next), logoutController);

module.exports = router;

