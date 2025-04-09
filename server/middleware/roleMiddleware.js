// Middleware to authorize specific roles
console.log('roleMiddleware begins');

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      console.log(req.user.role);
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      next();
    };
  };

  console.log('roleMiddleware ends');

  module.exports = authorizeRoles;
  