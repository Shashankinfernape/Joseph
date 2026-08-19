const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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

// Start Server locally if not running in Google Cloud Functions
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Vidya Mandir CBSE Platform API Server Running!`);
    console.log(` Port: http://localhost:${PORT}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

// Export for Google Cloud Functions
exports.api = app;
