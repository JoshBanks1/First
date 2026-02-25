const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminRequired = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
  return next();
};

module.exports = { authRequired, adminRequired };
