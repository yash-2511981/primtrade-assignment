import { useState, useEffect } from 'react'
import useApi from '../hooks/useApi'
import { GET_TASKS_API, DELETE_TASK_API } from '../utils/apiEndpoints'
import TaskDialogue from './TaskDialogue'
import UpdatePasswordDialogue from './UpdatePasswordDialogue'
import { useUserAction } from '../hooks/useUserAction'

const UserHome = () => {
  const { tasks, setTasks, deleteTask } = useUserAction()
  const { get, delete: deleteApi } = useApi()
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    get(GET_TASKS_API).then((result) => {
      if (result.success) {
        setTasks(result.data || [])
      } else {
        console.error("Failed to fetch tasks:", result.error)
      }
    }).catch((err) => {
      console.error("Error fetching tasks:", err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateTask = () => {
    setSelectedTask(null)
    setShowTaskDialog(true)
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setShowTaskDialog(true)
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteApi(`${DELETE_TASK_API}/${taskId}`).then((result) => {
        if (result.success) {
          deleteTask(taskId)
          alert("Task deleted successfully")
        } else {
          alert(result.error || "Failed to delete task")
        }
      }).catch((err) => {
        console.error("Error deleting task:", err)
        alert("Failed to delete task")
      })
    }
  }

  const handleCloseTaskDialog = () => {
    setShowTaskDialog(false)
    setSelectedTask(null)
    get(GET_TASKS_API).then((result) => {
      if (result.success) {
        setTasks(result.data || [])
      }
    })
  }

  return (
    <div className="pt-20 px-4 pb-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">My Tasks</h1>
            <p className="text-gray-600">Manage your tasks here</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowPasswordDialog(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium"
            >
              Change Password
            </button>
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Create Task
            </button>
          </div>
        </div>

        {tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 wrap-break-word">{task.title}</h3>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap shrink-0 ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm grow wrap-break-word">{task.description}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
          </div>
        )}

        {showTaskDialog && (
          <TaskDialogue task={selectedTask} onClose={handleCloseTaskDialog} />
        )}

        {showPasswordDialog && (
          <UpdatePasswordDialogue onClose={() => setShowPasswordDialog(false)} />
        )}
      </div>
    </div>
  )
}

export default UserHome
