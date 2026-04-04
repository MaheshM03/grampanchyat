const dotenv = require('dotenv');
dotenv.config(); // ✅ MUST be first — before any process.env usage

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize'); 
const xss = require('xss-clean');                        

const app = express();

// ─────────────────────────────────────────
// 1. CORS — allow localhost + local network
// ─────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  process.env.CLIENT_URL,         
].filter(Boolean);                

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─────────────────────────────────────────
// 2. SECURITY HEADERS (helmet)
// ─────────────────────────────────────────
app.use(helmet());
app.disable('x-powered-by'); 

// ─────────────────────────────────────────

