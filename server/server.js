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
  origin: '*',
  credentials: true
}));

// ─────────────────────────────────────────
// TEST ROUTE
// ─────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────
const newsRoutes = require('./routes/news');
const kunbiRoutes = require('./routes/kunbi');

app.use('/api/news', newsRoutes);
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