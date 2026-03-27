const { verifyToken } = require('../utils/jwt');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    const token = header.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      req.user = verifyToken(header.split(' ')[1]);
    } catch {
      // ignore invalid token
    }
  }
  next();
}

module.exports = { auth, optionalAuth };
