require('dotenv').config(); // Load env variables first

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
// CORS (for development + production)
// ─────────────────────────────────────────
app.use(cors({
  origin: '*', // For now allow all (fix later if needed)
  credentials: true
}));

// ─────────────────────────────────────────
// TEST ROUTE
// ─────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// ─────────────────────────────────────────
// SERVE REACT BUILD (IMPORTANT)
// ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ─────────────────────────────────────────
// START SERVER (CRITICAL FOR RAILWAY)
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});