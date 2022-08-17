import { useContext } from 'react'
import UserContext from './UserContext'

export interface UseUserReturn<DbUserType = any> {
  user?: DbUserType
  authUser?: Record<string, unknown>
  dbUser?: Record<string, unknown>
  fetchAndSetDbUserFromAuthUser: ({
    authUser,
  }: {
    authUser: Record<string, unknown>
  }) => Promise<Record<string, unknown>>
  logout: () => Promise<void>
}

export type UseUser<DbUserType = any> = () => UseUserReturn<DbUserType>

const useUser: UseUser = () => {
  const context = useContext(UserContext)

  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}

export default useUser
