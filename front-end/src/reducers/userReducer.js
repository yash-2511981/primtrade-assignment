const userReducer = (users, action) => {
    switch (action.type) {
        case "set":
            return [...action.users];
        case "add":
            return [...users, action.user];

        case "update":
            return users.map(t =>
                t._id === action.user._id ? action.user : t
            );

        case "delete":
            return users.filter(t => t._id !== action.id);

        default:
            return users;
    }
};

export default userReducer;
