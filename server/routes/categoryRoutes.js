
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all categories
router.get('/categories',authMiddleware, categoryController.getAllCategories);

// GET a single category by ID
router.get('/:id',authMiddleware, categoryController.getCategoryById);

// POST create a new category
router.post('/categories', authMiddleware,categoryController.createCategory);

// PUT update an existing category
router.put('/:id',authMiddleware, categoryController.updateCategory);

// DELETE delete an existing category
router.delete('/:id',authMiddleware, categoryController.deleteCategory);

module.exports = router;
