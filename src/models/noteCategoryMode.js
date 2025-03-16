const pool = require('../config/db');

async function insertNoteCategory(noteId, categoryId) {
    const result = await pool.query("INSERT INTO NOTE_CATEGORY (note_id, category_id) VALUES ($1, $2) RETURNING *", [noteId, categoryId]);
    return result.rows[0];
}

async function deleteNoteCategoryByCategoryId(categoryId) {
    return await pool.query('DELETE FROM note_category WHERE category_id = $1', [categoryId]);
}


module.exports = { insertNoteCategory, deleteNoteCategoryByCategoryId };