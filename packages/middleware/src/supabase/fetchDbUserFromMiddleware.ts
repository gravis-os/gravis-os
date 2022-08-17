import { CrudModule } from '@gravis-os/types'
import fetchWithSupabaseFromMiddleware from './fetchWithSupabaseFromMiddleware'

export interface FetchDbUserFromMiddlewareProps {
  authUser: { id?: string; sub: string }
  userModule: CrudModule // The app's userModule
}

/**
 * Fetch the dbUser from the authUser
 */
const fetchDbUserFromMiddleware = async (
  props: FetchDbUserFromMiddlewareProps
) => {
  const { userModule, authUser } = props

  if (!authUser) return

  const { data } = await fetchWithSupabaseFromMiddleware({
    from: userModule.table.name,
    select: userModule.select.detail,
    match: { id: authUser.sub || authUser.id },
  })

  return data?.[0]
}

export default fetchDbUserFromMiddleware
