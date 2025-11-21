const taskReducers = (tasks, action) => {
    console.log("🟦 Reducer Called");
    console.log("Action:", action);
    console.log("Previous State:", tasks);

    let newState = tasks;

    switch (action.type) {
        case "set":
            newState = [...action.tasks];
            break;

        case "add":
            newState = [...tasks, { ...action.task }];   // clone task
            break;

        case "update":
            newState = tasks.map(t =>
                t._id === action.task._id
                    ? { ...action.task }
                    : t
            );
            break;

        case "delete":
            newState = tasks.filter(t => t._id !== action.id);
            break;

        default:
            console.warn("⚠️ Unknown action type:", action.type);
            newState = tasks;
    }

    console.log("New State:", newState);
    console.log("--------------------------------------------------");

    return newState;
};

export default taskReducers;
