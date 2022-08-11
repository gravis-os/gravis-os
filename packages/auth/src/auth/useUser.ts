import { useContext } from 'react'
import UserContext from './UserContext'

export interface UseUserReturn {
  user?: Record<string, unknown>
  authUser?: Record<string, unknown>
  logout?: () => Promise<void>
}

const useUser = (): UseUserReturn => {
  const context = useContext(UserContext)

  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}

export default useUser
