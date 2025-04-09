const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes')

const app = express();

console.log('entering app.js now');
// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('SkillForge UMS Backend Running 🚀');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

console.log('app.js ends');

module.exports = app;
