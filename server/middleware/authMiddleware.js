const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Assuming your JWT payload has '_id' for user ID
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
};

module.exports = authMiddleware;
