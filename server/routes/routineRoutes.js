// routes/routineRoutes.js
const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all routines
router.get('/',authMiddleware, routineController.getAllRoutines);

// GET a single routine by ID
router.get('/:id',authMiddleware, routineController.getRoutineById);

// POST create a new routine
router.post('/post',authMiddleware, routineController.createRoutine);

// PUT update an existing routine
router.put('/:id',authMiddleware, routineController.updateRoutine);

// DELETE delete an existing routine
router.delete('/:id',authMiddleware, routineController.deleteRoutine);

module.exports = router;
