import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import {
  fetchDbUserFromMiddleware,
  getMiddlewareRouteBreakdown,
} from '@gravis-os/middleware'
import getIsPermittedInSaaSMiddleware, {
  GetIsPermittedInSaaSMiddlewareProps,
} from './getIsPermittedInSaaSMiddleware'
import getPersonRelationsFromPerson from '../utils/getPersonRelationsFromPerson'

const isDebug = process.env.DEBUG === 'true'

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
    const middlewareRouteBreakdown = await getMiddlewareRouteBreakdown(req)
    const {
      url,
      pathname,
      hostname,
      protocol,
      currentHost,
      subdomain,
      nakedDomain,
      // Checks
      isApiRoute,
      isAuthRoute,
      isLoginRoute,
      isBaseRoute,
      isSubdomain,
      isSubdomainWithBaseRoute,
      isLoggedIn,
      authUser,
    } = middlewareRouteBreakdown

    // The sequence of these checks is important
    switch (true) {
      case isLoginRoute && isLoggedIn:
        // Redirect existing users to the dashboard if already logged in
        url.pathname = `/_workspaces/${currentHost}`

        /**
         * We need to get the dbUser here to correctly redirect
         * users that are currently logged into the app but are not
         * in the right workspace. Try logging in with Evfy but going to
         * app workspace. You'll get stuck in a loop when you click return to home.
         *
         * Expected: onClick return to home, should redirect Evfy user to the
         * evfy workspace.
         *
         * This case only happens when the user is logged in but gets redirected out.
         */
        const dbUser = await fetchDbUserFromMiddleware({ userModule, authUser })
        const person = dbUser.person?.[0] || {}
        const { workspace } = getPersonRelationsFromPerson(person)
        const isLoggedInButIncorrectWorkspace =
          isLoggedIn && workspace && workspace.slug !== subdomain

        if (isDebug) {
          console.log(
            `♻️ [DEBUG] Middleware isLoginRoute && isLoggedin Redirect`,
            {
              pathname,
              isLoginRoute,
              isLoggedIn,
              loginRedirectUrl: url.pathname,
              hostname,
              authUser,
              dbUser,
            }
          )
        }

        // Redirect user to the correct workspace
        if (isLoggedInButIncorrectWorkspace) {
          const loggedInButIncorrectWorkspaceUrl = `${protocol}://${workspace.slug}.${nakedDomain}`
          return NextResponse.redirect(loggedInButIncorrectWorkspaceUrl)
        }

        return NextResponse.redirect(url)

      case isAuthRoute:
      case isApiRoute:
        // Allow auth routes and api routes to pass through
        if (isDebug && !isApiRoute) {
          console.log(`♻️ [DEBUG] Middleware isAuthRoute Passthrough`, {
            isAuthRoute,
          })
        }
        return NextResponse.next()

      case isBaseRoute:
        // Redirect to app.hostname to preserve the nakedDomain for the landing page
        const baseRouteRedirectUrl = `${protocol}://app.${hostname}`
        if (isDebug) {
          console.log(
            `♻️ [DEBUG] Middleware isBaseRoute Redirect`,
            baseRouteRedirectUrl
          )
        }
        return NextResponse.redirect(baseRouteRedirectUrl)

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
                subdomain,
                pathname,
              })(req)

              // Final: Only allow the user to pass through if all checks pass
              return true
            },
            redirectTo: authorizationFailureRedirectTo, // Invalid Authorisation
          },
        })(req, event)

        // Block the user if they are not authorised to access this workspace
        if (middlewareAuth?.status === 307) {
          const unauthorizedRedirectUrl = req.nextUrl.clone()
          unauthorizedRedirectUrl.pathname = authorizationFailureRedirectTo
          if (isDebug) {
            console.log(`♻️ [DEBUG] Middleware isSubdomain Redirect`, {
              unauthorizedRedirectUrl: unauthorizedRedirectUrl.pathname,
            })
          }
          return NextResponse.redirect(unauthorizedRedirectUrl)
        }

        // Allow user to pass through
        // Go to pages/_workspaces/[workspace]/*
        url.pathname = `/_workspaces/${currentHost}${url.pathname}`
        if (isDebug) {
          console.log(`♻️ [DEBUG] Middleware isSubdomain Rewrite`, url.pathname)
        }
        return NextResponse.rewrite(url)

      default:
        if (isDebug) console.log(`♻️ [DEBUG] Middleware -> Default`)
        return NextResponse.next()
    }
  }
}

export default SaasRouterMiddleware
