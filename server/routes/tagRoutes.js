const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tags/:categoryId',authMiddleware , tagController.getTagsByCategoryId);
// GET all tags
router.get('/tag',authMiddleware, tagController.getAllTags);

// GET a single tag by ID
router.get('/:id',authMiddleware, tagController.getTagById);

// POST create a  tag
router.post('/post',authMiddleware, tagController.createTag);

// PUT update an existing tag
router.put('/:id',authMiddleware, tagController.updateTag);

// DELETE delete an existing tag
router.delete('/:id',authMiddleware, tagController.deleteTag);

module.exports = router;
