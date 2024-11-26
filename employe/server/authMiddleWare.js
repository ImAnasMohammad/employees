const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);

    
    req.user = decoded;

    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
