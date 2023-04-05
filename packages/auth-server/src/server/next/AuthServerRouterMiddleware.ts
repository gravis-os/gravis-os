import type { NextApiHandler } from 'next'
import camelCase from 'lodash/camelCase'
import withApiAuthAndAuthz from '../utils/withApiAuthAndAuthz'
import config from '../../config/config'
import { initSupabaseAdminClient } from '../index'

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
): NextApiHandler => {
  return async (req, res) => {
    const {
      method,
      query: { supabase: injectedRoute },
    } = req

    // @example `create-user`
    const route = Array.isArray(injectedRoute)
      ? injectedRoute[0]
      : injectedRoute

    // Only allow valid routes
    const isValidRoute = Object.values(config.apiRoutes).includes(
      `/api/auth-server/${route}`
    )
    if (!isValidRoute) res.status(404).end()

    // Only allow certain requests
    const allowedMethods = ['POST', 'PATCH', 'DELETE']
    if (!allowedMethods.includes(method)) {
      res.setHeader('Allow', allowedMethods)
      res.status(405).end('Method Not Allowed')
    }

    // Init
    const SupabaseAdminClient = initSupabaseAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    try {
      const functionKey = camelCase(route)
      const result = await SupabaseAdminClient[`${functionKey}`](req.body)
      const { data, error } = result
      if (error) throw new Error(error.message) // Throw the error out for bottom catch
      res.status(200).json({ data })
    } catch (err) {
      console.error('Error caught:', err.message)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  }
}

export default (
  config: AuthServerMiddlewareProps = {},
  options?: Parameters<typeof withApiAuthAndAuthz>[1]
) => {
  return withApiAuthAndAuthz(AuthServerRouterMiddleware(config), options)
}
