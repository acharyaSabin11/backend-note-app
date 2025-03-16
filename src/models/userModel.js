const pool = require('./../config/db');

async function createUser(username, passwordHash) {
    const result = await pool.query("INSERT INTO USERS (username, password_hash, created_at) VALUES ($1, $2, NOW()) RETURNING *", [username, passwordHash]);
    console.log(result);
    return result.rows[0];
}

async function getUserByUsername(username) {
    const result = await pool.query("SELECT * FROM users where username = $1", [username]);
    return result.rows[0];
}

async function getUserById(id) {
    const result = await pool.query("SELECT * FROM users where id = $1", [id]);
    return result.rows[0];
}

module.exports = { createUser, getUserByUsername, getUserById };