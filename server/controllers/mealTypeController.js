const MealType = require('../models/mealType');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all category routes that need authentication
exports.applyAuthMiddleware = authMiddleware;


// Create a new meal type
exports.createMealType = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request object
    const { name } = req.body;

    // Check if the meal type already exists for the user
    const existingMealType = await MealType.findOne({ name, userId });
    if (existingMealType) {
      return res.status(400).send({ message: 'Meal type with this name already exists.' });
    }

    const mealType = new MealType({
      ...req.body,
      userId
    });
    await mealType.save();
    res.status(201).send(mealType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get all meal types
exports.getAllMealTypes = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request object
    const mealTypes = await MealType.find({ userId });
    res.status(200).send(mealTypes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single meal type by ID
exports.getMealTypeById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request object
    const mealType = await MealType.findOne({ _id: req.params.id, userId });
    if (!mealType) {
      return res.status(404).send({ message: 'Meal type not found' });
    }
    res.status(200).send(mealType);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a meal type by ID
exports.updateMealType = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request object
    const { id } = req.params;
    const { name } = req.body;

    // Check if the meal type with the new name already exists for the user
    const existingMealType = await MealType.findOne({ name, userId });
    if (existingMealType) {
      return res.status(400).send({ message: 'Meal type with this name already exists.' });
    }

    const updatedMealType = await MealType.findOneAndUpdate(
      { _id: id, userId },
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedMealType) {
      return res.status(404).json({ message: 'Meal type not found' });
    }

    res.status(200).json(updatedMealType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a meal type by ID
exports.deleteMealType = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is attached to the request object
    const mealType = await MealType.findOneAndDelete({ _id: req.params.id, userId });

    if (!mealType) {
      return res.status(404).send({ message: 'Meal type not found' });
    }

    res.send(mealType);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
