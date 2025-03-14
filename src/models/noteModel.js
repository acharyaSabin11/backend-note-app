const pool = require('../config/db');

async function createNote(title, description, additionalInfo, userId) {
    const result = await pool.query("INSERT INTO notes (title, description, additional_info, user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *", [title, description, additionalInfo, userId]);

    return result.rows[0];
}

async function getNotesByUserId(userId, page = 1, limit = 10) {
    const count = await pool.query('SELECT COUNT(*) FROM notes WHERE user_id = $1', [userId]);
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ', [userId, limit, (page - 1) * limit]);
    // console.log(result);
    console.log(count.rows);

    return { notes: result.rows, totalCount: parseInt(count.rows[0].count), totalPages: Math.ceil(count.rows[0].count / limit), page: parseInt(page), limit: parseInt(limit) };
}


module.exports = { createNote, getNotesByUserId };