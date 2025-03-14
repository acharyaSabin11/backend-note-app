const pool = require('../config/db');

async function createNote(title, description, additionalInfo, userId) {
    const result = await pool.query("INSERT INTO notes (title, description, additional_info, user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *", [title, description, additionalInfo, userId]);

    return result.rows[0];
}

async function getNotesByUserId(userId) {
    const result = pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);

    return result.rows;
}

async function getNotesByUserCategories(userId, categoryId) {

}