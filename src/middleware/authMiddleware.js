const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(token);

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decodedJwt = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedJwt;
        console.log(decodedJwt);
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid Auth Token" });
    }
}

module.exports = {
    authenticate
};