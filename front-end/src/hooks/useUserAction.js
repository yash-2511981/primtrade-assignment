import { createContext, useContext } from "react";

const UserActionContext = createContext(null)

const useUserAction = () => useContext(UserActionContext)

export { UserActionContext, useUserAction }