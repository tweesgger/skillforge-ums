const jwt = require('jsonwebtoken');

// Middleware to verify token
console.log('authMiddleware begins');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Token usually comes as "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    console.log(decoded);
    console.log(req.user);
    
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ message: 'Invalid token.' });
  }
};
console.log('authMiddleware ends');

module.exports = authenticateToken;
