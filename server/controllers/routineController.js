const Routine = require('../models/routine');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all category routes that need authentication
exports.applyAuthMiddleware = authMiddleware;


// Get all routines associated with the authenticated user
exports.getAllRoutines = async (req, res) => {
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    const routines = await Routine.find({ userId });
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single routine by ID
exports.getRoutineById = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new routine
exports.createRoutine = async (req, res) => {
  const { name, category, tags, sets, reps, weights, notes } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    // Check if a routine with the same name already exists for the current user
    const existingRoutine = await Routine.findOne({ userId, name });
    if (existingRoutine) {
      return res.status(400).json({ message: 'Routine with this name already exists.' });
    }

    const newRoutine = new Routine({
      userId,
      name,
      category,
      tags,
      sets,
      reps,
      weights,
      notes,
    });

    await newRoutine.save();

    res.status(201).json(newRoutine);
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: 'Routine with this name already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
};
// Update an existing routine
exports.updateRoutine = async (req, res) => {
  const { name, category, tags, sets, reps, weights, notes } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    const routine = await Routine.findByIdAndUpdate(
      req.params.id,
      { userId, name, category, tags, sets, reps, weights, notes },
      { new: true }
    );
    
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete an existing routine
exports.deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.findByIdAndDelete(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json({ message: 'Routine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
