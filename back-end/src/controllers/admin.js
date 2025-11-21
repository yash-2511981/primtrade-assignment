const { redis } = require("../config/reddis-connection");
const { getAllUsers, updateUser, removeUser } = require("../services/user");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const allUsers = asyncHandler(async (req, res) => {
    const users = await getAllUsers();

    if (!users) {
        throw new ApiError(404, "No users present")
    }

    await redis.setex('users', 30, JSON.stringify(users));
    successResponse(res, users, 'All users fetched successfully');
});

const udpateUserData = asyncHandler(async (req, res) => {
    const { id, name, email } = req.body;
    const updatedUser = await updateUser(id, { name, email });
    if (!updatedUser) {
        throw new ApiError(404, 'User not found');
    }

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    await redis.del("users");
    successResponse(res, userWithoutPassword, 'User data updated successfully');
});


const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedUser = await removeUser(id);

    if (!deletedUser) {
        throw new ApiError(404, 'User not found');
    }

    await redis.del("users");
    successResponse(res, null, 'User deleted successfully');
});


module.exports = { allUsers, udpateUserData, deleteUser };