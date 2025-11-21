const express = require('express');
const { validateRequest } = require('../middleware/validation');
const { getUserTasks, deleteTask, getUserData, updatePassword, updateTask, addTask } = require('../controllers/user');
const { taskSchema } = require('../validation/taskValidation');
const { cacheTasks } = require('../middleware/cacheTasks');
const { updateTaskSchema } = require('../validation/updateTaskSchema');

const userRouter = express.Router();

/**
 * @swagger
 * /app/users/tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *              example:
 *               success: true
 *               message: "Tasks fetched successfully"
 *               data:
 *                 - _id: "64a7f0e2b4d1c2a5e6f7g8h1"
 *                   title: "Buy milk"
 *                   description: "2 liters"
 *                   completed: false
 */

userRouter.get('/tasks', cacheTasks, getUserTasks);


/**
 * @swagger
 * /app/users/user-data:
 *   get:
 *     summary: Get logged-in user data
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User data fetched successfully"
 *               data:
 *                 _id: "64a7e1c2b4d1c2a5e6f7a123"
 *                 name: "Yash"
 *                 email: "yash@example.com"
 *                 role: "user"
 */

userRouter.get('/user-data', getUserData);

/**
 * @swagger
 * /app/users/update-password:
 *   patch:
 *     summary: Update password for the logged-in user
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Password updated successfully"
 */

userRouter.patch('/update-password', updatePassword);

/**
 * @swagger
 * /app/users/create-task:
 *   post:
 *     summary: Create a new task
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Task added successfully"
 *               data:
 *                 _id: "64a7f0e2b4d1c2a5e6f7g8h9"
 *                 title: "New Task"
 *                 description: "Task description"
 *                 completed: false
 */

userRouter.post('/create-task', validateRequest(taskSchema), addTask);

/**
 * @swagger
 * /app/users/update-task:
 *   patch:
 *     summary: Update a task
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Task updated successfully"
 */

userRouter.patch('/update-task', validateRequest(updateTaskSchema), updateTask);

/**
 * @swagger
 * /app/users/delete-task/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [User Routes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Task deleted successfully"
 */

userRouter.delete('/delete-task/:taskId', validateRequest(taskSchema), deleteTask);

module.exports = userRouter;