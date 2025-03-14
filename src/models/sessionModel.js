const pool = require('../config/db');

async function createSession(userId, token) {
    const result = await pool.query("INSERT INTO sessions (user_id, token, created_at) VALUES ($1, $2, NOW()) RETURNING *", [userId, token]);

    return result.rows[0];
}

module.exports = { createSession };