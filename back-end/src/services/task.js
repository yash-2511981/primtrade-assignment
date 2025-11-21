const { Task } = require("../model/task")

const getTasks = (userId) => {
    return Task.find({ userId }).lean()
}

const createTask = (taskData) => {
    const task = new Task(taskData)
    return task.save()
}

const updateTaskData = (taskId, userId, updateData) => {
    return Task.findOneAndUpdate({ _id: taskId, userId }, updateData, { new: true })
}

const deleteTaskData = (taskId, userId) => {
    return Task.findOneAndDelete({ _id: taskId, userId })
}

module.exports = { getTasks, createTask, updateTaskData, deleteTaskData }