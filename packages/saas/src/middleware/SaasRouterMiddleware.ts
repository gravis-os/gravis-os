import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import {
  fetchDbUserFromMiddleware,
  getMiddlewareRouteBreakdown,
} from '@gravis-os/middleware'
import { isPathMatch } from '@gravis-os/utils'
import getIsPermittedInSaaSMiddleware, {
  GetIsPermittedInSaaSMiddlewareProps,
} from './getIsPermittedInSaaSMiddleware'
import getPersonRelationsFromDbUser from '../utils/getPersonRelationsFromDbUser'

const isDebug = process.env.DEBUG === 'true'

const PUBLIC_FILE = /\.(.*)$/

export interface SaasRouterMiddlewareProps {
  authenticationSuccessRedirectTo: string
  authenticationFailureRedirectTo: string
  authorizationFailureRedirectTo: string
  modulesConfig: GetIsPermittedInSaaSMiddlewareProps['modulesConfig']
  userAuthColumnKey?: string
  userModule: GetIsPermittedInSaaSMiddlewareProps['userModule']
  guestPaths?: GetIsPermittedInSaaSMiddlewareProps['guestPaths']
  validRoles?: GetIsPermittedInSaaSMiddlewareProps['validRoles']
}

/**
 * Middleware to detect workspace slug adapted from Vercel Platforms boilerplate
 * @link https://github.com/vercel/platforms/blob/main/middleware.ts
 *
 * @note The Edge Runtime, which is used by Next.js Middleware, does not support Node.js native APIs.
 * Middlewares run in the Vercel Edge Runtime which does not support
 * Node.js modules. Only browser-side libraries are supported in this file.
 * Do not attempt to import any node.js modules here.
 * @link https://stackoverflow.com/a/71109119/3532313
 */
const SaasRouterMiddleware = (props: SaasRouterMiddlewareProps) => {
  const {
    authenticationSuccessRedirectTo,
    authenticationFailureRedirectTo,
    authorizationFailureRedirectTo,
    modulesConfig,
    userAuthColumnKey = 'id',
    userModule,
    guestPaths = [],
    validRoles = [],
  } = props

  return async (req: NextRequest, event: NextFetchEvent) => {
    /**
     * Bounce/filter out certain routes from this middleware
     * This is a replacement for the config.matcher in middleware.ts downstream
     * Ignore specific routes bounce out these paths
     * @see https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
     */
    if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.startsWith('/fonts') ||
      req.nextUrl.pathname.startsWith('/api') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return
    }

    const middlewareRouteBreakdown = await getMiddlewareRouteBreakdown(req)
    const {
      url,
      pathname,
      hostname,
      protocol,
      subdomain,
      nakedDomain,
      workspacesPathnamePrefix,
      // Checks
      isApiRoute,
      isAuthRoute,
      isLoginRoute,
      isBaseRoute,
      isWorkspace,
      isWorkspaceBaseRoute,
      isLoggedIn,
      isCustomDomain,
      authUser,
    } = middlewareRouteBreakdown

    const SCENARIOS = {
      isLoggedInAndAtLoginPage: isLoggedIn && isLoginRoute,
      isApiOrAuthRoute: isApiRoute || isAuthRoute,
      isNakedDomainBaseRoute: isBaseRoute,
      isGuestAtWorkspacePage: !isLoggedIn && isWorkspaceBaseRoute,
      isWorkspaceRoute: isWorkspace,
      isCustomDomain,
    }

    if (!isApiRoute && isDebug) {
      console.log(`🔥️ [DEBUG] MiddlewareRouteBreakdown`, {
        middlewareRouteBreakdown,
        props,
        SCENARIOS,
      })
    }

    // The sequence of these checks is important.
    switch (true) {
      case SCENARIOS.isLoggedInAndAtLoginPage:
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
        const dbUser = await fetchDbUserFromMiddleware({
          userModule,
          authUser,
          userAuthColumnKey,
        })
        const { workspace, role, isAdmin } =
          getPersonRelationsFromDbUser(dbUser)

        // Redirect user to the correct workspace
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
              workspace,
              role,
            }
          )
        }
        if (isLoggedInButIncorrectWorkspace) {
          const loggedInButIncorrectWorkspaceUrl = `${protocol}://${workspace.slug}.${nakedDomain}`
          if (isAdmin) {
            if (isDebug) {
              console.log(
                `♻️ [DEBUG] Middleware isLoginRoute && isLoggedin > Wrong Workspace > isAdmin Redirect`,
                {
                  pathname,
                  workspace,
                  role,
                  loggedInButIncorrectWorkspaceUrl,
                }
              )
            }
            return NextResponse.redirect(loggedInButIncorrectWorkspaceUrl)
          }

          const res = NextResponse.next()
          res.cookies.delete('sb-access-token')
          res.cookies.delete('sb-refresh-token')
          if (isDebug) {
            console.log(
              `♻️ [DEBUG] Middleware isLoginRoute && isLoggedin > Wrong Workspace Not Admin > Redirect`,
              {
                pathname,
                workspace,
                role,
                loggedInButIncorrectWorkspaceUrl,
              }
            )
          }
          return res
        }

        // Redirect existing users to the dashboard if already logged in
        // Check if the user role has a custom redirect route
        const authenticationSuccessRedirectRoute =
          role?.authentication_success_redirect_route ||
          authenticationSuccessRedirectTo

        url.pathname = authenticationSuccessRedirectRoute
        return NextResponse.redirect(url)
      case SCENARIOS.isApiOrAuthRoute:
        // Allow auth routes and api routes to pass through
        return NextResponse.next()
      case SCENARIOS.isNakedDomainBaseRoute:
        // Redirect to app.hostname to preserve the nakedDomain for the landing page
        const baseRouteRedirectUrl = `${protocol}://app.${hostname}`
        if (isDebug) {
          console.log(
            `♻️ [DEBUG] Middleware isBaseRoute Redirect`,
            baseRouteRedirectUrl
          )
        }
        return NextResponse.redirect(baseRouteRedirectUrl)
      case SCENARIOS.isGuestAtWorkspacePage:
        url.pathname = workspacesPathnamePrefix // Redirect to the workspace home
        return NextResponse.rewrite(url)
      case SCENARIOS.isWorkspaceRoute:
        /**
         * Allow visitors to pass through guestPaths in a workspace
         * e.g. ['/about*] in workspaces e.g. evfy.marketbolt.io/about
         */
        const isGuestPath = isPathMatch(pathname, guestPaths)
        if (isGuestPath) {
          // Go to pages/_workspaces/[workspace]/*
          url.pathname = `${workspacesPathnamePrefix}${url.pathname}`
          if (isDebug) {
            console.log(
              `♻️ [DEBUG] Middleware isWorkspace Rewrite for Guest Paths`,
              url.pathname
            )
          }
          return NextResponse.rewrite(url)
        }

        // Check for authc and authz if this is not a guest path
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
                userAuthColumnKey,
                subdomain,
                pathname,
                validRoles,
                guestPaths,
              })(req)

              // Final: Only allow the user to pass through if all checks pass
              return true
            },
            redirectTo: authorizationFailureRedirectTo, // Invalid Authorisation
          },
        })(req, event)

        // Block the user if they are not authorised to access this workspace
        // @ts-ignore
        if (middlewareAuth?.status === 307) {
          const middlewareAuthErrorRedirectUrl = req.nextUrl.clone()
          middlewareAuthErrorRedirectUrl.pathname = isLoggedIn
            ? authorizationFailureRedirectTo
            : authenticationFailureRedirectTo
          if (isDebug) {
            console.log(`♻️ [DEBUG] Middleware isWorkspace 307 Redirect`, {
              middlewareAuthErrorRedirectUrl:
                middlewareAuthErrorRedirectUrl.pathname,
            })
          }
          return NextResponse.redirect(middlewareAuthErrorRedirectUrl)
        }

        // Allow user to pass through
        // Go to pages/_workspaces/[workspace]/*
        url.pathname = `${workspacesPathnamePrefix}${url.pathname}`
        if (isDebug) {
          console.log(`♻️ [DEBUG] Middleware isWorkspace Rewrite`, url.pathname)
        }
        return NextResponse.rewrite(url)

      default:
        if (isDebug) console.log(`♻️ [DEBUG] Middleware -> Default`)
        return NextResponse.next()
    }
  }
}

export default SaasRouterMiddleware
