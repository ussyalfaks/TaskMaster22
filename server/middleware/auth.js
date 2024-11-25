import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    // Retrieve token from the Authorization header or cookies
    let token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

    // If no token is found, throw an error
    if (!token) {
      return res.status(401).json({ error: 'Authentication token not found.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId from the decoded token to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token.' });
  }
};
