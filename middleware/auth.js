const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Check for token in Authorization header
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];

  // Check for token in cookies
  const tokenFromCookie = req.cookies && req.cookies.token;

  // Use token from either header or cookies
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
