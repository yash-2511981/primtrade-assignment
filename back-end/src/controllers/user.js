const { redis } = require("../config/reddis-connection");
const { createTask, updateTaskData, getTasks, deleteTaskData } = require("../services/task");
const { updateUser, getUser } = require("../services/user");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { validatePassword, generateHashPassword } = require("../utils/bcrypt");
const { successResponse } = require("../utils/successResponse");

const updatePassword = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, 'Old password and new password are required');
    }

    const user = await getUser("_id", id);
    console.log(user)

    const isPasswordValid = await validatePassword(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Old password is incorrect');
    }

    const hashedPassword = await generateHashPassword(newPassword);
    await updateUser(id, { password: hashedPassword });

    successResponse(res, null, 'Password updated successfully');
});


const getUserData = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const user = await getUser("_id", id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const { password, ...userWithoutPassword } = user

    successResponse(res, userWithoutPassword, 'User data fetched successfully');
});


const addTask = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const { title, description } = req.body;

    const task = await createTask({ userId: id, title, description });

    await redis.del(`user:${id}`);

    successResponse(res, task.toObject(), 'Task added successfully');
});


const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { cacheKey } = req;
    const { title, description, completed, taskId } = req.body;
    console.log(req.body)

    let updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;

    const task = await updateTaskData(taskId, id, updateFields);

    if (!task) throw new ApiError(404, "Task not found");

    await redis.del(`user:${id}`);

    successResponse(res, task.toObject(), 'Task updated successfully');
});


const getUserTasks = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { cacheKey } = req;

    const tasks = await getTasks(id);

    if (!tasks) {
        throw new ApiError(404, 'No tasks found for the user');
    }

    await redis.setex(cacheKey, 3600, JSON.stringify(tasks));

    successResponse(res, tasks, 'Tasks fetched successfully');
});


const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { cacheKey } = req;
    const taskId = req.params

    await deleteTaskData(taskId, id);

    await redis.del(`user:${id}`);

    successResponse(res, null, 'Task deleted successfully');
});



module.exports = { updatePassword, addTask, updateTask, getUserTasks, deleteTask, getUserData };