const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15min' });

    return { accessToken, refreshToken };
}

module.exports = { generateTokens };