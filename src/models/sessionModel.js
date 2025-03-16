const pool = require('../config/db');

async function createSession(userId, token) {
    //first delete any existing session for the user
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [userId]);
    const result = await pool.query("INSERT INTO sessions (user_id, token, created_at) VALUES ($1, $2, NOW()) RETURNING *", [userId, token]);
    return result.rows[0];
}

async function getSessionByUserId(userId) {
    const result = await pool.query('SELECT * FROM sessions WHERE user_id = $1', [userId]);

    return result.rows[0];
}

async function revokeRefreshToken(userId) {
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [userId]);
}

module.exports = { createSession, getSessionByUserId, revokeRefreshToken };