const pool = require('../config/db');

async function createCategory(title, userId) {
    const matchResult = await pool.query('SELECT * FROM category WHERE title = $1 AND user_id = $2', [title, userId]);
    if (matchResult.rows.length > 0) throw new Error('Category already exists', {
        cause: "already_exists"
    });
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

async function getCategoryDetailById(categoryId) {
    const result = await pool.query('SELECT * FROM category WHERE id = $1', [categoryId]);
    const notes = await pool.query("SELECT n.* FROM notes n JOIN note_category nc ON n.id = nc.note_id WHERE nc.category_id = $1", [categoryId]);
    return { category: result.rows[0], notes: notes.rows };
}

async function deleteCategoryById(categoryId) {
    try {
        return await pool.query('DELETE FROM category WHERE id = $1', [categoryId]);
    } catch (e) {
        console.log(e);
    }
}

async function updateCategoryById(categoryId,
    title) {
    await pool.query('UPDATE category SET title = $1 WHERE id = $2', [title, categoryId]);
    return;
}

module.exports = { createCategory, getCategoriesByUserId, getCategoriesByUserIdWithPagination, getCategoryDetailById, deleteCategoryById, updateCategoryById };