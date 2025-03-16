const pool = require('../config/db');

async function createCategory(title, userId) {
    const result = await pool.query("INSERT INTO category (title, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *", [title, userId]);
    return result.rows[0];
}

async function getCategoriesByUserIdWithPagination(userId, page = 1, limit = 10) {
    const count = await pool.query('SELECT COUNT(*) FROM category WHERE user_id = $1', [userId]);
    const result = await pool.query('SELECT * FROM category WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ', [userId, limit, (page - 1) * limit]);
    return { categories: result.rows, totalCount: parseInt(count.rows[0].count), totalPages: Math.ceil(count.rows[0].count / limit), page: parseInt(page), limit: parseInt(limit) };
}

async function getCategoriesByUserId(userId) {
    const result = await pool.query('SELECT * FROM category WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
}

module.exports = { createCategory, getCategoriesByUserId, getCategoriesByUserIdWithPagination };