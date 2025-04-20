const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes')

const app = express();

// Rate limiter: maximum 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

console.log('server begins');

// Set secure HTTP headers
app.use(helmet());

console.log('entering app.js now');
// Middleware
// Enable CORS - allow requests from your frontend only
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true
}));
app.use(express.json());



// Default Route
app.get('/', (req, res) => {
  res.send('SkillForge UMS Backend Running 🚀');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

console.log('app.js ends');

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});


module.exports = app;
