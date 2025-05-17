const jwt = require('jsonwebtoken');

// 権限チェックミドルウェア
const checkRole = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { checkRole };
