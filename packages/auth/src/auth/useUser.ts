import { useContext } from 'react'
import UserContext, { UserContextInterface } from './UserContext'

function useUser<AppDbUser>() {
  const context = useContext<UserContextInterface<AppDbUser>>(UserContext)

  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}

export default useUser
