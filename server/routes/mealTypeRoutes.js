const express = require('express');
const router = express.Router();
const mealTypeController = require('../controllers/mealTypeController'); 
const authMiddleware = require('../middleware/authMiddleware');


// Create a new meal type
router.post('/mealTypes',authMiddleware, mealTypeController.createMealType);

// Get all meal types
router.get('/mealTypes',authMiddleware, mealTypeController.getAllMealTypes);

// Get a single meal type by ID
router.get('/mealTypes/:id',authMiddleware, mealTypeController.getMealTypeById);

// Update a meal type by ID
router.put('/mealTypes/:id',authMiddleware, mealTypeController.updateMealType);

// Delete a meal type by ID
router.delete('/mealTypes/:id',authMiddleware, mealTypeController.deleteMealType);

module.exports = router;
