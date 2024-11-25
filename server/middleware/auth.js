import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    let token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token in header, check in cookies
    if (!token && req.cookies) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};
