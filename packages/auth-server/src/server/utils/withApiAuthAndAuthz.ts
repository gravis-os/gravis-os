import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {
  CookieOptions,
  COOKIE_OPTIONS,
  TOKEN_REFRESH_MARGIN,
} from '@supabase/auth-helpers-shared'
import {
  getUser as getAuthUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'

export type AuthorizerFunction = (params: {
  context: Parameters<typeof getAuthUser>[0]
  user: Awaited<ReturnType<typeof getAuthUser>>['user']
}) => Promise<boolean>

/**
 * ## Protecting API routes
 * Wrap an API Route to check that the user has a valid session or valid authorization.
 * If they're not logged in or not authorized, the handler will return a 401 Unauthorized.
 *
 * ```js
 * // pages/api/protected-route.js
 * import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';
 * import { withApiAuthAndAuthz } from '@gravis-os/auth-server/utils';
 *
 * const authorizer = async ({ context, user }) => {
 *   const { data: dbUser } = await supabaseServerClient(context)
 *     .from('user')
 *     .select('is_active')
 *     .match({ id: user.id });
 *   return dbUser.is_active;
 * }
 *
 * export default withApiAuthAndAuthz(
 *   async function ProtectedRoute(req, res) {
 *     // Run queries with RLS on the server
 *     const { data } = await supabaseServerClient({ req, res }).from('test').select('*');
 *     res.json(data);
 *   },
 *   { authorizer }
 * );
 * ```
 *
 * If you visit `/api/protected-route` without a valid session cookie, you will get a 401 response.
 *
 * @category Server
 */
export default function withApiAuthAndAuthz(
  handler: NextApiHandler,
  options: {
    cookieOptions?: CookieOptions
    tokenRefreshMargin?: number
    authorizer?: AuthorizerFunction
  } = {}
) {
  // If don't have the authorizer function, then return the default supabase withApiAuth function
  if (!options.authorizer) return withApiAuth(handler, options)
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const context = { req, res }
      const cookieOptions = { ...COOKIE_OPTIONS, ...options.cookieOptions }
      const tokenRefreshMargin =
        options.tokenRefreshMargin ?? TOKEN_REFRESH_MARGIN

      // Use supabase's getUser to check for authentication instead
      const { user: authUser, accessToken } = await getAuthUser(context, {
        cookieOptions,
        tokenRefreshMargin,
      })
      if (!accessToken || !authUser) throw new Error('No access token or user')

      const isAuthorized = await options.authorizer({ context, user: authUser })
      if (!isAuthorized) throw new Error('Unauthorized')

      await handler(req, res)
    } catch (error) {
      res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      })
    }
  }
}
