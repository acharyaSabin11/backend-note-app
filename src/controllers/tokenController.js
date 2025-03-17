const jwt = require('jsonwebtoken');
const { getSessionByUserId } = require('../models/sessionModel');
const { getUserByUsername, getUserById } = require('../models/userModel');

const renewAccessToken = async (req, res) => {
    //1. Get the refresh token from the cookies
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies);

    //2. If there is no refresh token, return an error
    if (!refreshToken) {
        return res.status(400).send({ message: "No refresh token provided" });
    }

    try {
        //3. Verify the refresh token and get the user id
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // 4. Check if the refresh token is in the database
        const session = await getSessionByUserId(user.id);
        // 5. If the refresh token is not in the database, return an error
        if (!session || session.token !== refreshToken) {
            return res.status(400).send({ message: "Invalid refresh token" });
        }
        // 6. If the refresh token is valid, generate a new access token
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const userData = await getUserById(user.id);
        console.log(userData);

        // 7. Send the new access token to the client
        res.status(200).json({ accessToken, user: { id: userData.id, username: userData.username } });
    } catch (e) {
        // 8. If there is an error, return an error
        return res.status(400).send({ message: "Invalid refresh token" });
    }

}


module.exports = {
    renewAccessToken,
}