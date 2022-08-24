import { createContext } from 'react'
import { UserContextInterface as InjectedUserContextInterface } from '@gravis-os/types'

export interface UserContextInterface<AppDbUser = any>
  extends InjectedUserContextInterface<AppDbUser> {}

const UserContext = createContext<UserContextInterface | null>(null)

export default UserContext
