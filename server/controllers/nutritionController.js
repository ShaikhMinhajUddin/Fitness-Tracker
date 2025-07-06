const Nutrition = require('../models/nutrition');

// Create a new nutrition entry
exports.create = async (req, res) => {
  try {
    // Create a new nutrition entry with the request body
    const newNutrition = new Nutrition({
      userId: req.user._id, // Extract user ID from the authenticated user's token
      mealType: req.body.mealType,
      name: req.body.name,
      quantity: req.body.quantity,
      calories: req.body.calories,
      carbohydrates: req.body.carbohydrates,
      proteins: req.body.proteins,
      fats: req.body.fats,
      createdAt: new Date() // Set createdAt to the current date and time
    });

    // Save the new nutrition entry to the database
    const savedNutrition = await newNutrition.save();
   
    res.json(savedNutrition);
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};

// Get all nutrition entries for the authenticated user
exports.getAll = async (req, res) => {
  try {
    const nutritionEntries = await Nutrition.find({ userId: req.user._id });
    res.json(nutritionEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific nutrition entry by ID
exports.getById = async (req, res) => {
  try {
    const nutritionEntry = await Nutrition.findOne({ _id: req.params.id, userId: req.user._id });
    if (!nutritionEntry) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    res.json(nutritionEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific nutrition entry by ID
exports.updateById = async (req, res) => {
  try {
    const updatedNutrition = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { 
        $set: { 
          mealType: req.body.mealType,
          name: req.body.name,
          quantity: req.body.quantity,
          calories: req.body.calories,
          carbohydrates: req.body.carbohydrates,
          proteins: req.body.proteins,
          fats: req.body.fats,
          updatedAt: new Date() 
        }
      },
      { new: true }
    );

    if (!updatedNutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }

    res.json(updatedNutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific nutrition entry by ID
exports.deleteById = async (req, res) => {
  try {
    const deletedNutrition = await Nutrition.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deletedNutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    res.json({ message: 'Nutrition entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
