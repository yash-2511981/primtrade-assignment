const express = require('express');
const { login, logout, registerUser } = require('../controllers/auth');
const { validateRequest } = require('../middleware/validation');
const { loginValidationSchema } = require('../validation/loginValidation');
const { userSchema } = require('../validation/userValidation');
const { authenticationMiddleware } = require('../middleware/authentication');

const authrouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, token stored in httpOnly cookie
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Login successful"
 *               data:
 *                 user:
 *                   _id: "64a7..."
 *                   name: "Yash"
 *                   email: "yash@example.com"
 *                   role: "user"
 */
authrouter.post('/login', validateRequest(loginValidationSchema), login);
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user by clearing the httpOnly cookie
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []   # Requires user to be logged in
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Logout successful"
 */
authrouter.get('/logout', authenticationMiddleware, logout);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully, token stored in httpOnly cookie
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User registered successfully"
 *               data:
 *                 user:
 *                   _id: "64a7..."
 *                   name: "New User"
 *                   email: "user@example.com"
 *                   role: "user"
 */
authrouter.post('/register', validateRequest(userSchema), registerUser);

module.exports = authrouter;