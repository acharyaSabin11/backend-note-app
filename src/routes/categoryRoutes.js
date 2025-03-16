const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateCategory, handleGetCategories, handleGetRecentCategories, handleGetCategoryDetail, handleDeleteCategory, handleUpdateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', authenticate, handleCreateCategory);
router.get('/', authenticate, handleGetCategories);
router.get('/recent', authenticate, handleGetRecentCategories);
router.get('/:id', authenticate, handleGetCategoryDetail);
router.delete('/:id', authenticate, handleDeleteCategory);
router.put('/:id', authenticate, handleUpdateCategory);

module.exports = router;

