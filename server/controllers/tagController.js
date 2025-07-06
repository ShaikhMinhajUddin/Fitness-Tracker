const Tag = require('../models/tag');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all tag routes that need authentication
exports.applyAuthMiddleware = authMiddleware;

// Create a new tag
exports.createTag = async (req, res) => {
  const { name, categoryId } = req.body;
  const userId = req.user._id; // Extract user ID from authenticated user

  try {
    // Create a new tag with userId and categoryId
    const newTag = new Tag({ name, categoryId, userId });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all tags for the authenticated user
exports.getAllTags = async (req, res) => {
  const userId = req.user._id;

  try {
    const tags = await Tag.find({ userId });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tags' });
  }
};

// Get a single tag by ID
exports.getTagById = async (req, res) => {
  const userId = req.user._id;

  try {
    const tag = await Tag.findOne({ _id: req.params.id, userId });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tag' });
  }
};

// Get tags by category ID for the authenticated user
exports.getTagsByCategoryId = async (req, res) => {
  const userId = req.user._id;

  try {
    const tags = await Tag.find({ categoryId: req.params.categoryId, userId });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing tag
exports.updateTag = async (req, res) => {
  const userId = req.user._id;

  try {
    const updatedTag = await Tag.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!updatedTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: 'Error updating tag' });
  }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedTag = await Tag.findOneAndDelete({ _id: req.params.id, userId });
    if (!deletedTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting tag' });
  }
};
