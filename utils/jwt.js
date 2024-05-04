const jwt = require('jsonwebtoken');

function createJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;
}

function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function createCookies(res, user) {
    const jwtToken = createJWT(user); // Use createJWT to generate the token
    const expirationTime = new Date(Date.now() + (24 * 60 * 60 * 1000)); // Set expiration to 24 hours from now
    res.cookie('token', jwtToken, {
        httpOnly: true,
        expires: expirationTime,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
}

module.exports = { createJWT, verifyJWT, createCookies };
