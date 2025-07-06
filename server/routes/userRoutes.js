const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, getUser, updateUser, getUpdate } = require('../controllers/userControllers.js');
const router = express.Router();
const path = require('path');

const JWT_SECRET = 'your_jwt_secret';  // Import or define JWT_SECRET

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;  // Ensure you have cookie-parser middleware set up
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded._id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
};

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/create', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/users' ,getUser);  // Protected route
router.get('/users/:id', getUpdate);  // Protected route
router.put('/users/:userId',  upload.single('profileImage'), updateUser);  // Protected route

module.exports = router;
