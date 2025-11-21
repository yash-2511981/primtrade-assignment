import {  useState } from "react";
import { UserContext } from "../hooks/useUser";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export default UserProvider;
