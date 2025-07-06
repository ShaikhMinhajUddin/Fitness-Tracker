const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, nutritionController.create);

router.get('/',authMiddleware, nutritionController.getAll);

router.get('/:id',authMiddleware, nutritionController.getById);

router.put('/:id',authMiddleware, nutritionController.updateById);

router.delete('/:id',authMiddleware, nutritionController.deleteById);

module.exports = router;
