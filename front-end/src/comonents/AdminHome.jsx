import React, { useState, useEffect } from 'react'
import { useAdminActions } from '../hooks/useAdminActions'
import useApi from '../hooks/useApi'
import { GET_ALL_USERS_API, DELETE_USER_API } from '../utils/apiEndpoints'
import UserDialogue from './UserDialogue'

const AdminHome = () => {
  const { users, setUsers, removeUser } = useAdminActions()
  const { get, delete: deleteApi } = useApi()
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    get(GET_ALL_USERS_API).then((result) => {
      if (result.success) {
        setUsers(result.data || [])
      } else {
        console.error("Failed to fetch users:", result.error)
      }
    }).catch((err) => {
      console.error("Error fetching users:", err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      deleteApi(`${DELETE_USER_API}/${userId}`).then((result) => {
        if (result.success) {
          removeUser(userId)
          alert("User deleted successfully")
        } else {
          alert(result.error || "Failed to delete user")
        }
      }).catch((err) => {
        console.error("Error deleting user:", err)
        alert("Failed to delete user")
      })
    }
  }

  const handleCloseUserDialog = () => {
    setShowUserDialog(false)
    setSelectedUser(null)
    get(GET_ALL_USERS_API).then((result) => {
      if (result.success) {
        setUsers(result.data || [])
      }
    })
  }

  const userCount = users ? users.length : 0

  return (
    <div className="pt-20 px-4 pb-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">All Users</h1>
              <p className="text-gray-600">Manage all users in the system</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold whitespace-nowrap">
              Total Users: {userCount}
            </div>
          </div>
        </div>

        {users && users.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No users found.</p>
          </div>
        )}

        {showUserDialog && (
          <UserDialogue user={selectedUser} onClose={handleCloseUserDialog} />
        )}
      </div>
    </div>
  )
}

export default AdminHome
