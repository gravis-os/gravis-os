import type { NextApiRequest, NextApiResponse } from 'next'
import config from '../../config/config'
import handleAuthServerCreateUser from './handlers/auth-server-create-user'

const routesToHandlers = {
  [config.apiRoutes.createUser]: handleAuthServerCreateUser,
}

export interface AuthServerMiddlewareProps {}

/**
 * AuthServerRouterMiddleware
 *
 * @usage:
 * // In `pages/api/auth-server/[...supabase].ts`
 * import { AuthServerRouterMiddleware } from '@gravis-os/auth-server/next'
 * export default AuthServerRouterMiddleware()
 * @param injectedConfig
 * @constructor
 */
const AuthServerRouterMiddleware = (
  injectedConfig: AuthServerMiddlewareProps = {}
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const {
      query: { supabase: injectedRoute },
    } = req

    // @example `create-checkout-session`
    const route = Array.isArray(injectedRoute)
      ? injectedRoute[0]
      : injectedRoute

    // Options
    const nextConfig = {
      ...config,
      ...injectedConfig, // User options from downstream
    }

    // Happy path
    const handler = routesToHandlers[`/api/auth-server/${route}`]
    if (handler) return handler(req, res, nextConfig)

    // Fallback to 404
    res.status(404).end()
  }
}

export default AuthServerRouterMiddleware
