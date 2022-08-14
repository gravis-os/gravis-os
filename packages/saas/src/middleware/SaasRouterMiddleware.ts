import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import { getMiddlewareRouteBreakdown } from '@gravis-os/middleware'
import getIsPermittedInSaaSMiddleware, {
  GetIsPermittedInSaaSMiddlewareProps,
} from './getIsPermittedInSaaSMiddleware'

export interface SaasRouterMiddlewareProps {
  authenticationFailureRedirectTo: string
  authorizationFailureRedirectTo: string
  modulesConfig: GetIsPermittedInSaaSMiddlewareProps['modulesConfig']
  userModule: GetIsPermittedInSaaSMiddlewareProps['userModule']
}

/**
 * Middleware to detect workspace slug adapted from Vercel Platforms boilerplate
 * @link https://github.com/vercel/platforms/blob/main/middleware.ts
 *
 * TODO: Refactor _middleware to ./middleware.tsx when upgrading to Next@12.2
 * We are currently limited to Next@12.2 because @supabase/auth-helpers-nextjs@0.2.5
 * only supports up to Next 12.1.
 *
 * @note The Edge Runtime, which is used by Next.js Middleware, does not support Node.js native APIs.
 * Middlewares run in the Vercel Edge Runtime which does not support
 * Node.js modules. Only browser-side libraries are supported in this file.
 * Do not attempt to import any node.js modules here.
 * @link https://stackoverflow.com/a/71109119/3532313
 */
const SaasRouterMiddleware = (props: SaasRouterMiddlewareProps) => {
  const {
    authenticationFailureRedirectTo,
    authorizationFailureRedirectTo,
    modulesConfig,
    userModule,
  } = props

  return async (req: NextRequest, event: NextFetchEvent) => {
    const {
      url,
      hostname,
      protocol,
      currentHost,
      // Checks
      isApiRoute,
      isAuthRoute,
      isLoginRoute,
      isBaseRoute,
      isSubdomain,
      isSubdomainWithBaseRoute,
      isLoggedIn,
    } = getMiddlewareRouteBreakdown(req)

    // The sequence of these checks is important
    switch (true) {
      case isLoginRoute && isLoggedIn:
        // Redirect existing users to the dashboard if already logged in
        url.pathname = `/_workspaces/${currentHost}`
        return NextResponse.redirect(`${protocol}://${hostname}`)

      case isAuthRoute:
      case isApiRoute:
        // Allow auth routes and api routes to pass through
        return NextResponse.next()

      case isBaseRoute:
        // Redirect to app.hostname to trigger isSubdomain folder pathing
        return NextResponse.redirect(`${protocol}://app.${hostname}`)

      case isSubdomainWithBaseRoute && !isLoggedIn:
        url.pathname = '/' // Redirect to pages/index.tsx
        return NextResponse.rewrite(url)

      case isSubdomain:
        // Check for authc and authz
        const middlewareAuth = await withMiddlewareAuth({
          redirectTo: authenticationFailureRedirectTo, // Invalid Authentication
          authGuard: {
            /**
             * Any throws here will be caught by the auth-helpers middleware
             * which will force the redirectTo function to be called.
             * @param authUser
             */
            isPermitted: async (authUser) => {
              // Check if the user is permitted to access the route
              await getIsPermittedInSaaSMiddleware({
                authUser,
                modulesConfig,
                userModule,
              })(req)

              // Final: Only allow the user to pass through if all checks pass
              return true
            },
            redirectTo: authorizationFailureRedirectTo, // Invalid Authorisation
          },
        })(req, event)

        // Block the user if they are not authorised to access this workspace
        if (middlewareAuth?.status === 307) {
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = authorizationFailureRedirectTo
          return NextResponse.redirect(redirectUrl)
        }

        // Allow user to pass through
        // Go to pages/_workspaces/[workspace]/*
        url.pathname = `/_workspaces/${currentHost}${url.pathname}`
        return NextResponse.rewrite(url)

      default:
        return NextResponse.next()
    }
  }
}

export default SaasRouterMiddleware
