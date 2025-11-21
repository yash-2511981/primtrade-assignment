import { useReducer } from "react";
import { UserActionContext } from "../hooks/useUserAction"
import taskReducers from "../reducers/taskReducer"


const UserActionProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducers, []);

    const setTasks = (tasks) => {
        dispatch({
            type: "set",
            tasks
        })
    }

    const addTask = (task) => {
        dispatch({
            type: "add",
            task
        });
    };

    const updateTask = (task) => {
        dispatch({
            type: "update",
            task
        });
    };

    const deleteTask = (id) => {
        dispatch({
            type: "delete",
            id
        });
    };

    return (
        <UserActionContext.Provider value={{ tasks, addTask, deleteTask, updateTask, setTasks }}>
            {children}
        </UserActionContext.Provider>
    )
}

export default UserActionProvider