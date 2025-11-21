import { useState } from "react";
import useApi from "../hooks/useApi";
import { ADD_TASK_API, UPDATE_TASK_API } from "../utils/apiEndpoints";
import { useUserAction } from "../hooks/useUserAction";


const TaskDialogue = ({ task, onClose }) => {

    const { post, patch } = useApi();
    const { addTask, updateTask } = useUserAction()

    const [taskData, setTaskData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        completed: task?.completed || false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    const validateInputs = () => {
        const { title, description } = taskData;
        if (!title || !description) {
            alert("Please fill in all fields");
            return false;
        }

        if (title.length < 10) {
            alert("Title must be at least 10 characters long");
            return false;
        }

        if (description.length < 20) {
            alert("Description must be at least 20 characters long");
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateInputs()) {
            if (task && task._id) {
                patch(UPDATE_TASK_API, { ...taskData, taskId: task._id }).then((result) => {
                    if (result.success) {
                        updateTask(result.data);
                        alert("Task updated successfully");
                        setTaskData({ title: '', description: '', completed: false });
                        if (onClose) onClose();
                    } else {
                        alert(result.error || "Failed to update task");
                    }
                }).catch((err) => {
                    console.error("Task update failed", err);
                    alert("Failed to update task");
                });

            } else {
                post(ADD_TASK_API, taskData).then((result) => {
                    if (result.success) {
                        addTask(result.data);
                        alert("Task created successfully");
                        setTaskData({ title: '', description: '', completed: false });
                        if (onClose) onClose();
                    } else {
                        alert(result.error || "Failed to create task");
                    }
                }).catch((err) => {
                    console.error("Task creation failed", err);
                    alert("Failed to create task");
                });
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{task && task._id ? 'Update Task' : 'Create Task'}</h2>
                    {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>}
                </div>
                <form action="" className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="Task Title" name="title" value={taskData.title} className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="description">Description</label>
                        <textarea placeholder="Task Description" name="description" value={taskData.description} rows="4" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
                    </div>

                    {task && task._id && (
                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="completed" checked={taskData.completed} onChange={(e) => setTaskData({ ...taskData, completed: e.target.checked })} />
                            <label htmlFor="completed">Completed</label>
                        </div>
                    )}

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>
                        {task && task._id ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskDialogue
