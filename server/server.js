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

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(express.json());
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
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Admin access required' });
};

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
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    req.session.save(err => {
      if (err) return res.status(500).json({ message: 'Session error' });
      res.json({ success: true, message: 'Logged in', token: 'dummy-for-client' });
    });
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

app.use('/api/logout', logoutRoutes);
app.use('/api/grievance', (req, res, next) => {
  if (req.method === 'GET') return authMiddleware(req, res, next);
  next();
}, grievanceRoutes);

app.use('/api/news', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) return authMiddleware(req, res, next);
  next();
}, newsRoutes);

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
// SERVE REACT BUILD (SAFE)
// ─────────────────────────────────────────
const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');

  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error serving React build:", err);
      res.status(500).send("Frontend not found");
    }
  });
});

// ─────────────────────────────────────────
// START SERVER (IMPORTANT)
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
