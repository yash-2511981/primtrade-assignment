import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { UPDATE_USER_API } from "../utils/apiEndpoints";
import { useAdminActions } from "../hooks/useAdminActions";

const UserDialogue = ({ user, onClose }) => {
    const { put } = useApi()
    const { updateUser } = useAdminActions()

    const [formData, setformData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const setData = () => {
            if (user && user._id) {
                setformData({
                    name: user.name || '',
                    email: user.email || ''
                });
            }
        }
        setData()
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }

    const validateInputs = () => {
        const { email, name } = formData;
        if (!email || !name) {
            alert("Please fill in all fields");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email");
            return false;
        }

        if (name.length < 2) {
            alert("Name must be at least 2 characters long");
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateInputs() || !user || !user._id) {
            return;
        }

        put(UPDATE_USER_API, {
            id: user._id,
            name: formData.name,
            email: formData.email
        }).then(response => {
            if (response.success) {
                updateUser(response.data);
                alert("User updated successfully");
                if (onClose) onClose();
            } else {
                alert(response.error || "Failed to update user");
            }
        }).catch((err) => {
            console.error("User update failed", err);
            alert("Failed to update user");
        });
    }

    if (!user || !user._id) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Update User</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="User Name"
                            name="name"
                            value={formData.name}
                            required
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="User Email"
                            name="email"
                            value={formData.email}
                            required
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserDialogue
