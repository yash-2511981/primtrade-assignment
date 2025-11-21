import useApi from "../hooks/useApi"
import { useUser } from "../hooks/useUser"
import { LOGOUT_API } from "../utils/apiEndpoints"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const { user, setUser } = useUser()
    const { get } = useApi()
    const navigate = useNavigate()

    const handleLogout = () => {
        get(LOGOUT_API).then((result) => {
            if (result.success) {
                setUser(null);
                navigate('/login');
            }
        }).catch((err) => {
            console.error("Logout failed", err);
        });
    }

    return (
        <nav className='flex fixed top-0 left-0 w-full h-16 bg-gray-800 text-white items-center px-6 justify-between z-40 shadow-md'>
            <div className="flex items-center">
                <h1 className="text-xl font-bold">MyApp</h1>
            </div>
            <div className="flex items-center gap-4">
                {user && (
                    <span className="text-sm hidden sm:inline">Welcome, {user.name || user.email}</span>
                )}
                <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar
