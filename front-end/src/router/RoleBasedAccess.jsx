import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const RoleBasedAccess = () => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" />
    }

    const getRoleBasedPath = (role) => {
        switch (role) {
            case 'user':
                return '/user-home';
            case 'admin':
                return '/admin-home';
            default:
                return '/login';
        }
    };

    return <Navigate to={getRoleBasedPath(user.role)} replace />;
};

export default RoleBasedAccess;
