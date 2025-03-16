const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateNote, handleGetNotes, handleRecentNotes } = require('../controllers/noteController');


const router = express.Router();

router.post('/', authenticate, handleCreateNote);
router.get('/', authenticate, handleGetNotes);

module.exports = router;