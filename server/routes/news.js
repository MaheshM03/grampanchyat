const express = require('express');
const router = express.Router();
const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
} = require('../controllers/newsController');

// @desc Get news list
router.get('/', getNews);

// @desc Get single news
router.get('/:id', getNewsById);

// @desc Create news (admin)
router.post('/', createNews);

// @desc Update news (admin)
router.put('/:id', updateNews);

// @desc Delete news (admin)
router.delete('/:id', deleteNews);

module.exports = router;
