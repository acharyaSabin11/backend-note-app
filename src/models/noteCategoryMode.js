const pool = require('../config/db');

async function insertNoteCategory(noteId, categoryId) {
    const result = await pool.query("INSERT INTO ")
}