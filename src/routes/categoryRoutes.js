const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateCategory, handleGetCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', authenticate, handleCreateCategory);
router.get('/', authenticate, handleGetCategories);

module.exports = router;

