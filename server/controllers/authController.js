const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');


console.log('authController begins');
// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  // In registration endpoint
  const role = req.body.role || 'user';  // Default to 'user' if not provided

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [ username, email, hashedPassword, role]
    );
    console.log('role added with no issues');

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Match password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and assign token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email,  role: user.rows[0].role},
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );
    console.log(token);    

    res.json({ token });

    console.log( role);  

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
console.log('authController ends');
