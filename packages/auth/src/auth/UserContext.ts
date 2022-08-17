import { createContext } from 'react'

// TODO@Joel: Export type
const UserContext = createContext({
  user: null,
  authUser: null,
  dbUser: null,
  fetchAndSetDbUserFromAuthUser: () => null,
  logout: () => null,
})

export default UserContext
