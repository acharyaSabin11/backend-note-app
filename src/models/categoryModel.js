const pool = require('../config/db');

async function createCategory(title) {
    const result = await pool.query("INSERT INTO category (title, created_at) VALUES ($1, NOW()) RETURNING *", [title]);
    return result.rows[0];
}

async function getCategoryByUserId(userId) {
    const result = await pool.query("SELECT * FROM category WHERE user_id = $1", [userId]);

    return result.rows;
}

module.exports = { createCategory, getCategoryByUserId };