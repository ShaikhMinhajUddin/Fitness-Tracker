const Category = require('../models/category');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all category routes that need authentication
exports.applyAuthMiddleware = authMiddleware;

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    // Check if category with the same name already exists for this user
    const existingCategory = await Category.findOne({ name, userId });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with that name already exists for this user' });
    }

    // Create a new category with userId
    const newCategory = new Category({ name, userId });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if user is authorized to update this category
    if (category.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this category' });
    }

    // Check if category name is being updated to an existing name
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with that name already exists' });
      }
    }

    // Update the category
    if (name) category.name = name;

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing category
exports.deleteCategory = async (req, res) => {
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if user is authorized to delete this category
    if (category.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this category' });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
