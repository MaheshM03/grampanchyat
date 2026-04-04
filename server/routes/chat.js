const express = require('express');
const router = express.Router();
const { sendMessage, getHistory } = require('../controllers/chatController');

// POST /api/chat/message - send message & get response
router.post('/message', sendMessage);

// GET /api/chat/:sessionId/history - get chat history
router.get('/:sessionId/history', getHistory);

module.exports = router;
