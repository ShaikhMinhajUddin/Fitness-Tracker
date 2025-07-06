const express = require('express');
const router = express.Router();
const fitnessProgressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes

// Get all fitness progress entries
router.get('/',authMiddleware, fitnessProgressController.getAllFitnessProgress);

// Get a single fitness progress entry by ID
router.get('/:id',authMiddleware, fitnessProgressController.getFitnessProgressById);

// Create a new fitness progress entry
router.post('/',authMiddleware, fitnessProgressController.createFitnessProgress);

// Update a fitness progress entry
router.put('/:id',authMiddleware, fitnessProgressController.updateFitnessProgress);

// Delete a fitness progress entry
router.delete('/:id',authMiddleware, fitnessProgressController.deleteFitnessProgress);

module.exports = router;
