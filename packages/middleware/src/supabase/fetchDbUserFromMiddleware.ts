import { CrudModule } from '@gravis-os/types'

import fetchWithSupabaseFromMiddleware from './fetchWithSupabaseFromMiddleware'

export interface FetchDbUserFromMiddlewareProps {
  authUser: { id?: string; sub: string }
  userAuthColumnKey?: string
  userModule: CrudModule // The app's userModule
}

/**
 * Fetch the dbUser from the authUser
 */
const fetchDbUserFromMiddleware = async (
  props: FetchDbUserFromMiddlewareProps
) => {
  const { authUser, userAuthColumnKey = 'id', userModule } = props

  if (!authUser) return

  const { data } = await fetchWithSupabaseFromMiddleware({
    from: userModule.table.name,
    match: { [userAuthColumnKey]: authUser.sub || authUser.id },
    select: userModule.select.detail,
  })

  return data?.[0]
}

export default fetchDbUserFromMiddleware
