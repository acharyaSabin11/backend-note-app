const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateNote, handleGetNotes, handleRecentNotes, handleGetNoteDetail, handleDeleteNote, handleUpdateNote } = require('../controllers/noteController');


const router = express.Router();

router.post('/', authenticate, handleCreateNote);
router.get('/', authenticate, handleGetNotes);
router.get('/:id', authenticate, handleGetNoteDetail);
router.delete('/:id', authenticate, handleDeleteNote);
router.put('/:id', authenticate, handleUpdateNote);

module.exports = router;