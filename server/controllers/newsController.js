// In-memory store - localStorage replacement (server memory, restart resets)
let newsData = [];

// Helper functions
const getAllNews = () => [...newsData]; // Immutable copy
const addNews = (newItem) => {
  const item = { ...newItem, id: Date.now().toString() };
  newsData.unshift(item);
  return item;
};
const updateNewsItem = (id, updates) => {
  const index = newsData.findIndex(n => n.id === id);
  if (index > -1) {
    newsData[index] = { ...newsData[index], ...updates };
    return newsData[index];
  }
  return null;
};
const deleteNewsItem = (id) => {
  newsData = newsData.filter(n => n.id !== id);
};

// @desc Get all news - paginated/filtered
const getNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    let allNews = getAllNews();
    
    if (category) {
      allNews = allNews.filter(n => n.category === category);
    }
    
    const total = allNews.length;
    const paginated = allNews
      .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      count: paginated.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: paginated
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Create new news (admin)
const createNews = async (req, res) => {
  try {
    const savedNews = addNews(req.body);
    res.status(201).json({ success: true, data: savedNews });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update news (admin)
const updateNews = async (req, res) => {
  try {
    const updated = updateNewsItem(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Delete news (admin)
const deleteNews = async (req, res) => {
  try {
    deleteNewsItem(req.params.id);
    res.json({ success: true, message: 'News deleted' });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc Get single news
const getNewsById = async (req, res) => {
  try {
    const news = getAllNews().find(n => n.id === req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Get news by id error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
};
