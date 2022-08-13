import { useContext } from 'react'
import UserContext from './UserContext'

export interface UseUserReturn<TUser> {
  user?: TUser
  authUser?: Record<string, unknown>
  logout: () => Promise<void>
}

export type UseUser<TUser = any> = () => UseUserReturn<TUser>

const useUser: UseUser = () => {
  const context = useContext(UserContext)

  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}

export default useUser
