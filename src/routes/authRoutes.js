const express = require('express');
const { signUp, login, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', authenticate, logout);

module.exports = router;