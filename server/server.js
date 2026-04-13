require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'grampanchyat'
})
  .then(() => console.log('✅ MongoDB connected successfully to grampanchyat DB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(express.json({ limit: '10mb' })); // Fix PayloadTooLargeError for images
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(xss());

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// ─────────────────────────────────────────
// CORS
// ─────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ─────────────────────────────────────────
// TEST ROUTE
// ─────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// ─────────────────────────────────────────
// MIDDLEWARE - Session & Auth
// ─────────────────────────────────────────
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Removed inline session auth - using middleware/auth.js


app.use(cookieParser());
app.use(session({
  secret: 'grampanchayat-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ─────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────
const jwt = require('jsonwebtoken');
const SECRET = 'grampanchayat-admin-secret-key-change-in-prod'; // Match auth.js

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ adminId: 'admin' }, SECRET, { expiresIn: '24h' });
    res.json({ success: true, message: 'Logged in', token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────
const newsRoutes = require('./routes/news');
const kunbiRoutes = require('./routes/kunbi');
const grievanceRoutes = require('./routes/grievance');
const logoutRoutes = require('./routes/logout');

// PUBLIC: Get news (no auth) - controller direct import
app.get('/api/news', require('./controllers/newsController').getNews);

app.use('/api/logout', logoutRoutes);
app.use('/api/grievance', grievanceRoutes);

const authMiddleware = require('./middleware/auth');
// PROTECTED: Other news routes (admin only)
app.use('/api/news', authMiddleware, newsRoutes);

app.use('/api/kunbi', kunbiRoutes);

// ─────────────────────────────────────────
// ERROR HANDLER (API)
// ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  if (req.path && req.path.startsWith('/api')) {
    return res.status(500).json({ message: 'Server error' });
  }
  next(err);
});

// ─────────────────────────────────────────
// API ROUTES FIRST (before static)
// ─────────────────────────────────────────

// ─────────────────────────────────────────
// SERVE REACT BUILD (only non-API routes)
// ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// ─────────────────────────────────────────
// START SERVER (IMPORTANT)
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
