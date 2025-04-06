const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

console.log('entering app.js now');
// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running');
});
// Routes
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('SkillForge UMS Backend Running 🚀');
});

console.log('app.js ends');

module.exports = app;
