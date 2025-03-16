const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2min' });

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60min' });

    return { accessToken, refreshToken };
}

module.exports = { generateTokens };