import { createContext } from 'react'

import { UserContextInterface as InjectedUserContextInterface } from '@gravis-os/types'

export interface UserContextInterface<AppDbUser = any>
  extends InjectedUserContextInterface<AppDbUser> {}

const UserContext = createContext<UserContextInterface>({
  authUserLoading: true,
  dbUserFetching: true,
  dbUserLoading: true,
  dbUserQueryResult: null,
  logout: async () => false,
  refetchDbUserQuery: () => Promise.resolve(null),
})

export default UserContext
