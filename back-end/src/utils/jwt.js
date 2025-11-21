const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '3d' })
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

module.exports = { generateToken, verifyToken };