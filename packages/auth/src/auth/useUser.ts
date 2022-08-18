import { useContext } from 'react'
import UserContext from './UserContext'

const useUser = () => {
  const context = useContext(UserContext)

  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an AuthProvider')
  }

  return context
}

export default useUser
