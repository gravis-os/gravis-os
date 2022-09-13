import { createContext } from 'react'
import { UserContextInterface as InjectedUserContextInterface } from '@gravis-os/types'

export interface UserContextInterface<AppDbUser = any>
  extends InjectedUserContextInterface<AppDbUser> {}

const UserContext = createContext<UserContextInterface>({
  authUserLoading: true,
  dbUserLoading: true,
  dbUserFetching: true,
  dbUserQueryResult: null,
  refetchDbUserQuery: () => Promise.resolve(null),
  logout: async () => false,
})

export default UserContext
