import { createBrowserRouter } from "react-router-dom";
import Login from "../comonents/Login";
import Register from "../comonents/Register";
import UserHome from "../comonents/UserHome";
import AdminHome from "../comonents/AdminHome";
import RoleBasedAccess from "./RoleBasedAccess";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../layout/layout";
import UserActionProvider from "../context/UserActionContext";
import AdminActionProvider from "../context/AdminActionContext";

const router = createBrowserRouter([
    { path: '/', element: <RoleBasedAccess /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    {
        path: '/user-home', element: (
            <ProtectedRoutes role="user">
                <UserActionProvider>
                    <Layout />
                </UserActionProvider>
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <UserHome /> }
        ]
    },
    {
        path: "/admin-home", element: (
            <ProtectedRoutes role="admin">
                <AdminActionProvider>
                    <Layout />
                </AdminActionProvider>
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <AdminHome /> }
        ]
    },

]);

export default router;