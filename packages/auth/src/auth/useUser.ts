import { useContext } from 'react'
import UserContext, { UserContextInterface } from './UserContext'

function useUser<AppDbUser>() {
  const context = useContext<UserContextInterface<AppDbUser>>(UserContext)

  return context
}

export default useUser
