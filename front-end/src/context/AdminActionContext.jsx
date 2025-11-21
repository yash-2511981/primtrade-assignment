import { useReducer } from "react"
import { AdminActionContext } from "../hooks/useAdminActions"
import userReducer from "../reducers/userReducer"

const AdminActionProvider = ({ children }) => {

    const [users, dispatch] = useReducer(userReducer, []);

    const setUsers = (users) => {
        dispatch({ type: "set", users });
    };

    const addNewUser = (user) => {
        dispatch({ type: "add", user });
    };

    const updateUser = (user) => {
        dispatch({ type: "update", user });
    };

    const removeUser = (id) => {
        dispatch({ type: "delete", id });
    };

    return (
        <AdminActionContext.Provider
            value={{ users, setUsers, addNewUser, updateUser, removeUser }}
        >
            {children}
        </AdminActionContext.Provider>
    );
};

export default AdminActionProvider;
