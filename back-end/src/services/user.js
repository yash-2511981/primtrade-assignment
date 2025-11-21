const { User } = require('../model/user');

const getAllUsers = (filters) => {
    return User.find(filters).lean();
}

const getUser = (field, value) => {
    return User.findOne({ [field]: value }).lean();
}

const createUser = (userData) => {
    const user = new User(userData);
    return user.save();
}

const updateUser = (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
}

const removeUser = (userId) => {
    return User.findByIdAndDelete(userId);
}

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };