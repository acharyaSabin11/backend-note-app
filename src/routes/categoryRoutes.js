const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateCategory, handleGetCategories, handleGetRecentCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', authenticate, handleCreateCategory);
router.get('/', authenticate, handleGetCategories);
router.get('/recent', authenticate, handleGetRecentCategories);

module.exports = router;

