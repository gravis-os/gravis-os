import type { NextApiHandler } from 'next'

import camelCase from 'lodash/camelCase'

import config from '../../config/config'
import initSupabaseAdminClient from '../supabase/initSupabaseAdminClient'
import withApiAuthAndAuthz from '../utils/withApiAuthAndAuthz'

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
      body,
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
      const result = await SupabaseAdminClient[`${functionKey}`](body)
      const { data, error } = result
      if (error) {
        // Instead of throwing, handle the error functionally
        console.error('Error at result.error:', error.message)
        return res
          .status(500)
          .json({ error: { message: error.message, statusCode: 500 } })
      }
      res.status(200).json({ data })
    } catch (error) {
      console.error('Error caught:', error.message)
      res
        .status(500)
        .json({ error: { message: error.message, statusCode: 500 } })
    }
  }
}

export default (
  config: AuthServerMiddlewareProps = {},
  options?: Parameters<typeof withApiAuthAndAuthz>[1]
) => {
  return withApiAuthAndAuthz(AuthServerRouterMiddleware(config), options)
}
