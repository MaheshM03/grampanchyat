require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();
const mongoose = require('mongoose');

// ✅ MongoDB Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MongoDB connection error: missing MONGODB_URI');
  process.exit(1);
}
mongoose.connect(mongoUri, {
  dbName: 'grampanchyat'
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
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
// CORS (IMPORTANT)
// ─────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://grampanchyat-065z.onrender.com'
  ],
  credentials: true
}));

// ─────────────────────────────────────────
// TEST ROUTE (IMPORTANT)
// ─────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// ─────────────────────────────────────────
// BASIC ROOT ROUTE
// ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ─────────────────────────────────────────
// SESSION & COOKIE
// ─────────────────────────────────────────
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
  secret: 'grampanchayat-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ─────────────────────────────────────────
// AUTH ROUTE
// ─────────────────────────────────────────
const jwt = require('jsonwebtoken');
const SECRET = 'grampanchayat-admin-secret-key-change-in-prod';

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

// Public news route
app.get('/api/news', require('./controllers/newsController').getNews);

// Other routes
app.use('/api/logout', logoutRoutes);
app.use('/api/grievance', grievanceRoutes);

const authMiddleware = require('./middleware/auth');
app.use('/api/news', authMiddleware, newsRoutes);

app.use('/api/kunbi', kunbiRoutes);

// ─────────────────────────────────────────
// ERROR HANDLER
// ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  if (req.path && req.path.startsWith('/api')) {
    return res.status(500).json({ message: 'Server error' });
  }
  next(err);
});

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});