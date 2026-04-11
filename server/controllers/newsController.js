const News = require('../models/News');

// @desc Get all news - paginated/filtered
const getNews = async (req, res) => {
  try {
    let { page = 1, limit = 10, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const query = category ? { category } : {};

    const [news, total] = await Promise.all([
      News.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip),
      News.countDocuments(query)
    ]);

    res.json({
      success: true,
      count: news.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: news
    });

  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Create new news (admin)
const createNews = async (req, res) => {
  try {
    const savedNews = await new News(req.body).save();

    res.status(201).json({
      success: true,
      data: savedNews
    });

  } catch (error) {
    console.error('Create news error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Update news (admin)
const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error('Update news error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Delete news (admin)
const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News deleted'
    });

  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc Get single news
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      data: news
    });

  } catch (error) {
    console.error('Get news by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
};