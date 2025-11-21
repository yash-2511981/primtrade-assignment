const express = require('express');
const { allUsers, udpateUserData, deleteUser } = require('../controllers/admin');
const { cachedUsers } = require('../middleware/cacheUsers');

const adminRouter = express.Router();

/**
 * @swagger
 * /app/admin/get-users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin Routes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "All users fetched successfully"
 *               data:
 *                 - _id: "64a7..."
 *                   name: "Yash"
 *                   email: "yash@example.com"
 *                   role: "user"
 */

adminRouter.get('/get-users', cachedUsers, allUsers);

/**
 * @swagger
 * /app/admin/update-user:
 *   put:
 *     summary: Update user data (Admin only)
 *     tags: [Admin Routes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64a7f0e2..."
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User data updated successfully"
 *               data:
 *                 _id: "64a7f0e2..."
 *                 name: "Updated Name"
 *                 email: "updated@example.com"
 *                 role: "user"
 */
adminRouter.put('/update-user', udpateUserData);
/**
 * @swagger
 * /app/admin/delete-user/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Admin Routes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64a7f0e2..."
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User deleted successfully"
 */
adminRouter.delete('/delete-user/:id', deleteUser);

module.exports = adminRouter;