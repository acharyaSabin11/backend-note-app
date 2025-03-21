const pool = require('../config/db');
const { insertNoteCategory } = require('./noteCategoryMode');

async function createNote(title, description, additionalInfo, userId) {
    const result = await pool.query("INSERT INTO notes (title, description, additional_info, user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *", [title, description, additionalInfo, userId]);

    return result.rows[0];
}

async function getNotesByUserId(userId, page = 1, limit = 10, filter = 'all', sortBy = 'Date', orderBy = 'DESC') {
    if (!filter || filter === 'all') {
        const count = await pool.query('SELECT COUNT(*) FROM notes WHERE user_id = $1', [userId]);
        const result = await pool.query(`SELECT * FROM notes WHERE user_id = $1 ORDER BY ${sortBy === 'Date' ? "created_at" : sortBy === 'Title' ? "title" : "created_at"} ${orderBy === "ASC" ? "ASC" : "DESC"} LIMIT $2 OFFSET $3`, [userId, limit, (page - 1) * limit]);
        return { notes: result.rows, totalCount: parseInt(count.rows[0].count), totalPages: Math.ceil(count.rows[0].count / limit), page: parseInt(page), limit: parseInt(limit) };
    } else {
        //filtering by category
        const result = await pool.query(`SELECT n.* FROM notes n JOIN note_category nc ON n.id = nc.note_id WHERE n.user_id = $1 AND nc.category_id = $2 ORDER BY ${sortBy === 'Date' ? "n.created_at" : sortBy === 'Title' ? "n.title" : "n.created_at"} ${orderBy === "ASC" ? "ASC" : "DESC"} LIMIT $3 OFFSET $4`, [userId, filter, limit, (page - 1) * limit]);
        const count = await pool.query('SELECT COUNT(*) FROM notes WHERE user_id = $1 AND id IN (SELECT note_id FROM note_category WHERE category_id = $2)', [userId, filter]);
        return { notes: result.rows, totalCount: parseInt(count.rows[0].count), totalPages: Math.ceil(count.rows[0].count / limit), page: parseInt(page), limit: parseInt(limit) };
    }
}

async function getNoteDetailById(noteId) {
    const noteResult = await pool.query('SELECT * FROM notes WHERE id = $1', [noteId]);
    const noteCategories = await pool.query('SELECT category_id FROM note_category WHERE note_id = $1', [noteId]);
    const categories = await pool.query('SELECT * FROM category WHERE id = ANY($1)', [noteCategories.rows.map(category => category.category_id)]);
    return { note: noteResult.rows[0], categories: categories.rows };
}

async function deleteNoteById(noteId) {
    return await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
}


async function updateNoteById(noteId, title, description, additionalInfo, addCategories, removeCategories) {
    console.log(noteId, title, description, additionalInfo, addCategories, removeCategories);
    await pool.query('UPDATE notes SET title = $1, description = $2, additional_info = $3 WHERE id = $4', [title, description, additionalInfo, noteId]);
    if (removeCategories) {
        await pool.query('DELETE FROM note_category WHERE note_id = $1 AND category_id = ANY($2)', [noteId, removeCategories]);
    }
    if (addCategories) {
        addCategories.forEach(async categoryId => {
            await insertNoteCategory(noteId, categoryId);
        });
    }
    return;
}

async function getSearchedNotes(userId, search) {
    console.log(userId, search);
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1 AND (title ILIKE $2 OR description ILIKE $2)', [userId, `%${search}%`]);
    return result.rows;
}

module.exports = { createNote, getNotesByUserId, getNoteDetailById, deleteNoteById, updateNoteById, getSearchedNotes };