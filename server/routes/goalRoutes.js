const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController.js');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/goals', authMiddleware , goalController.getAllGoal);
router.post('/goals', authMiddleware , goalController.createGoal);
router.delete('/goals/:id', authMiddleware , goalController.deleteGoal);
module.exports = router;