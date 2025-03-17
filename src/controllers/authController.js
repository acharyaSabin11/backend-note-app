const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/userModel');
const { generateTokens } = require('../utils/tokens');
const { createSession, revokeRefreshToken } = require('../models/sessionModel');

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(username, hashedPassword);
        res.status(201).json({
            message: "User Registered Successfully", user: {
                id: newUser.id,
                username: newUser.username,
                created_at: newUser.created_at
            }
        });
    } catch (e) {
        console.log(e);
        if (e.code === '23505') {
            if (e.detail.includes('username') && e.detail.includes('already exists')) {
                res.status(409).json({
                    message: "Username already taken"
                });
                return;
            }
            res.status(500).json({
                message: "Error Signing Up the User"
            });
        }
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await getUserByUsername(username);
        // if user is not registered or if the passowrd is incorrect
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        // if the user exists and password is correct
        const { accessToken, refreshToken } = generateTokens(user);
        //Saving the refresh token
        await createSession(user.id, refreshToken);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
        res.status(200).json({ accessToken, user: { id: user.id, username: user.username } });
    } catch (e) {
        console.log(9);
        res.status(500).json({ message: "Something went wrong when logging in" });
        console.log(10);
    }
}

const logout = async (req, res) => {
    const userId = req.user.id
    await revokeRefreshToken(userId);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
    signUp,
    login,
    logout
}