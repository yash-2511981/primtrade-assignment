import { createContext, useContext } from "react"

const UserContext = createContext(null)

const useUser = () => useContext(UserContext)


export { UserContext, useUser }