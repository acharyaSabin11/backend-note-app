const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ userId: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2min' });

    const refreshToken = jwt.sign({ userID: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10min' });

    return { accessToken, refreshToken };
}

module.exports = { generateTokens };