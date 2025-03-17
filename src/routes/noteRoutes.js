const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleCreateNote, handleGetNotes, handleGetNoteDetail, handleDeleteNote, handleUpdateNote, handleSearchNotes } = require('../controllers/noteController');


const router = express.Router();

router.post('/', authenticate, handleCreateNote);
router.get('/', authenticate, handleGetNotes);
router.get('/search', authenticate, handleSearchNotes);
router.get('/:id', authenticate, handleGetNoteDetail);
router.delete('/:id', authenticate, handleDeleteNote);
router.put('/:id', authenticate, handleUpdateNote);

module.exports = router;