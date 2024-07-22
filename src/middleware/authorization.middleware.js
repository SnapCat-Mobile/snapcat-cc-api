const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

const generateAccessToken = (userData) => {
  return jwt.sign(userData, secret, { expiresIn: '24h' });
};

const generateRefreshToken = (userData) => {
  return jwt.sign(userData, secret);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).send('Token is missing.');
  }

  jwt.verify(token, secret, (error, user) => {
    if (error) {
      return res.status(403).send('Invalid token.');
    }
    req.user = user;
    next();
  });
};

const jwtMiddleware = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
};

module.exports = jwtMiddleware;