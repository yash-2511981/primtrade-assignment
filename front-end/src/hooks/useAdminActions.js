import { createContext, useContext } from "react";

const AdminActionContext = createContext(null)

const useAdminActions = () => useContext(AdminActionContext)


export { useAdminActions, AdminActionContext }