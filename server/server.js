const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Security dependencies
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// SECURITY MIDDLEWARE (OWASP Layer)
// ==========================================
// 1. Set Security HTTP Headers
app.use(helmet());

// 2. Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Adjust in production
  credentials: true
}));

// 3. Rate Limiting (100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// 4. Body Parser (limit payload size)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 5. Data Sanitization
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(xss()); // Prevent Cross-Site Scripting (XSS)

// 6. Prevent Parameter Pollution
app.use(hpp());

// Logging
app.use(morgan('dev'));

// Static mock documents & uploads folder
app.use('/documents', express.static(path.join(__dirname, 'public/documents')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/academics', require('./routes/academics'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/compliance', require('./routes/compliance'));
app.use('/api/cms', require('./routes/cms'));
app.use('/api/communications', require('./routes/communications'));

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    institution: 'Vidya Mandir International School, Bengaluru',
    affiliation: 'CBSE (No: 830942)',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Vidya Mandir CBSE Platform API Server Running!`);
  console.log(` Port: ${PORT}`);
  console.log(` Health: /api/health`);
  console.log(`====================================================`);
});

// Export for Google Cloud Functions
exports.api = app;
