import { createContext } from 'react'

const UserContext = createContext({
  user: null,
  authUser: null,
  logout: () => null,
})

export default UserContext
