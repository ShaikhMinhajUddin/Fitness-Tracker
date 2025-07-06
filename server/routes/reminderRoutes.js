const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController.js');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/reminders',authMiddleware , reminderController.getAllReminder);
router.post('/reminders',authMiddleware , reminderController.createReminder);
module.exports = router;