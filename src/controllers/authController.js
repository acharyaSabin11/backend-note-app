const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/userModel');
const { generateTokens } = require('../utils/tokens');
const { createSession } = require('../models/sessionModel');

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
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
        res.status(500).json({
            message: "Error Signing Up the User"
        });
    }
}

const login = async (req, res) => {
    try {
        console.log(1);
        const { username, password } = req.body;
        console.log(2);
        const user = await getUserByUsername(username);
        console.log(3);
        // if user is not registered or if the passowrd is incorrect
        if (!user || !(bcrypt.compare(password, user.password_hash))) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        // if the user exists and password is correct
        const { accessToken, refreshToken } = generateTokens(user);
        console.log(6);
        //Saving the refresh token
        await createSession(user.id, refreshToken);
        console.log(7);
        res.status(200).json({ accessToken, refreshToken });
        console.log(8);
    } catch (e) {
        console.log(9);
        res.status(500).json({ message: "Something went wrong when logging in" });
        console.log(10);
    }
}

module.exports = {
    signUp,
    login
}