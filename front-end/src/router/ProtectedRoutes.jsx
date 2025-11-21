import { useUser } from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, role }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />
    }

    const isAuthenticated = user.role === role;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoutes
