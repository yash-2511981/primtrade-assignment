import { useState } from "react";
import useApi from "../hooks/useApi";
import { UPDATE_PASSWORD_API } from "../utils/apiEndpoints";


const UpdatePasswordDialogue = ({ onClose }) => {

    const { patch } = useApi()

    const [formData, setformData] = useState({
        newPassword: '',
        oldPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    }

    const validateInputs = () => {
        const { newPassword, oldPassword } = formData;

        if (!newPassword || !oldPassword) {
            alert("Input fields are required");
            return false;
        }

        if (newPassword.length < 6) {
            alert("password should be at least 6 character long");
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateInputs()) {
            patch(UPDATE_PASSWORD_API, formData).then((result) => {
                if (result.success) {
                    alert("Password updated successfully");
                    setformData({ newPassword: '', oldPassword: '' });
                    if (onClose) onClose();
                } else {
                    alert(result.error || "Failed to update password");
                }
            }).catch((err) => {
                console.log(err)
                alert("Failed to update password")
            });
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Update Password</h2>
                    {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>}
                </div>
                <form action="" className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input type="password" placeholder="Old Password" name="oldPassword" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} value={formData.oldPassword} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" placeholder="New Password" name="newPassword" className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} value={formData.newPassword} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePasswordDialogue
