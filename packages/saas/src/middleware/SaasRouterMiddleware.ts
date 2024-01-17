/* eslint-disable fp/no-mutation */

import {
  GetMiddlewareRouteBreakdownOptions,
  getMiddlewareRouteBreakdown,
} from '@gravis-os/middleware'
import { isPathMatch } from '@gravis-os/utils/edge'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

import getIsPermittedInSaaSMiddleware, {
  GetIsPermittedInSaaSMiddlewareProps,
} from './getIsPermittedInSaaSMiddleware'

const isDebug = process.env.DEBUG === 'true'

export interface SaasRouterMiddlewareProps {
  adminPaths?: GetIsPermittedInSaaSMiddlewareProps['adminPaths']
  authenticationFailureRedirectTo: string
  authenticationSuccessRedirectTo: string
  authorizationFailureRedirectTo: string
  guestPaths?: GetIsPermittedInSaaSMiddlewareProps['guestPaths']
  hasNestedSubdomain?: GetMiddlewareRouteBreakdownOptions['hasNestedSubdomain']
  modulesConfig: GetIsPermittedInSaaSMiddlewareProps['modulesConfig']
  reservedSubdomains?: string[]
  setPathnameBeforeSuccessRewrite?: (pathname: string) => string
  subdomainOverride?: GetMiddlewareRouteBreakdownOptions['subdomainOverride']
  userAuthColumnKey?: string
  userModule: GetIsPermittedInSaaSMiddlewareProps['userModule']
  userPaths?: GetIsPermittedInSaaSMiddlewareProps['userPaths']
  validRoles?: GetIsPermittedInSaaSMiddlewareProps['validRoles']
}

const defaultGuestPaths = ['/auth/*']
const defaultAdminPaths = ['/admin/*']
const defaultUserPaths = ['/dashboard/*', '/account/*']

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
    adminPaths: injectedAdminPaths = [],
    authenticationFailureRedirectTo,
    authenticationSuccessRedirectTo,
    authorizationFailureRedirectTo,
    guestPaths: injectedGuestPaths = [],
    hasNestedSubdomain,
    modulesConfig,
    reservedSubdomains: injectedReservedSubdomains = [],
    setPathnameBeforeSuccessRewrite,
    subdomainOverride,
    userAuthColumnKey = 'id',
    userModule,
    userPaths: injectedUserPaths = [],
    validRoles = [],
  } = props

  const guestPaths = [...defaultGuestPaths, ...injectedGuestPaths]

  return async (req: NextRequest) => {
    const middlewareRouteBreakdown = await getMiddlewareRouteBreakdown(req, {
      hasNestedSubdomain,
      subdomainOverride,
    })

    const {
      authUser,
      dynamicPathParams,
      hostname,
      // Checks
      isAuthRoute,
      isBaseRoute,
      isCustomDomain,
      isLoggedIn,
      isLoginRoute,
      isWorkspace,
      isWorkspaceBaseRoute,
      nakedDomain,
      pathname,
      protocol,
      url,
      workspaceSlug,
    } = middlewareRouteBreakdown

    const isReservedSubdomain = [
      'api',
      'app',
      'auth',
      'dashboard',
      // Default
      'www',
      // User-defined
      ...injectedReservedSubdomains,
    ].includes(workspaceSlug)

    const SCENARIOS = {
      isAuthRoute,
      isCustomDomain,
      isGuestAtWorkspacePage: !isLoggedIn && isWorkspaceBaseRoute,
      isNakedDomainBaseRoute: isBaseRoute,
      isReservedSubdomain,
      isWorkspaceRoute: isWorkspace,
    }

    if (isDebug) {
      console.log(`🔥️ [DEBUG] MiddlewareRouteBreakdown`, {
        middlewareRouteBreakdown,
        SCENARIOS,
      })
    }

    // The sequence of these checks is important.
    switch (true) {
      case SCENARIOS.isAuthRoute: {
        if (isDebug) {
          console.log(`♻️ [DEBUG] Middleware: isAuthRoute Redirect`, {
            dynamicPathParams,
            isAuthRoute,
            pathname: url.pathname,
          })
        }

        return NextResponse.next()
      }
      case SCENARIOS.isReservedSubdomain: {
        // Terminate reserved subdomains directly out to the main page.
        if (isDebug) {
          console.log(`♻️ [DEBUG] Middleware isReservedSubdomain Redirect`)
        }
        return NextResponse.next()
      }
      case SCENARIOS.isNakedDomainBaseRoute: {
        // Terminate baseRoute directly out to the main page.
        if (isDebug) console.log(`♻️ [DEBUG] Middleware isBaseRoute Redirect`)
        return NextResponse.next()
      }
      case SCENARIOS.isGuestAtWorkspacePage: {
        url.pathname = dynamicPathParams // Redirect to the workspace home
        return NextResponse.rewrite(url)
      }
      case SCENARIOS.isWorkspaceRoute: {
        /**
         * Allow visitors to pass through guestPaths in a workspace
         * e.g. ['/about*] in workspaces e.g. evfy.marketbolt.io/about
         */
        const adminPaths = [...defaultAdminPaths, ...injectedAdminPaths]
        const userPaths = [...defaultUserPaths, ...injectedUserPaths]
        const isAdminPath = isPathMatch(pathname, adminPaths)
        const isUserPath = isPathMatch(pathname, userPaths)
        const isGuestPath = !isAdminPath && !isUserPath
        if (isGuestPath) {
          // Go to pages/_workspaces/[workspace]/*
          url.pathname = `${dynamicPathParams}${url.pathname}`
          if (isDebug) {
            console.log(
              `♻️ [DEBUG] Middleware isWorkspace Rewrite for Guest Paths`,
              {
                adminPaths,
                isAdminPath,
                isUserPath,
                pathname,
                urlPathname: url.pathname,
                userPaths,
              }
            )
          }
          return NextResponse.rewrite(url)
        }

        // Check for authc and authz if this is not a guest path
        const supabase = createMiddlewareClient({
          req,
          res: NextResponse.next(),
        })
        // Check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        // Not authenticated
        if (!session?.user) {
          const middlewareAuthErrorRedirectUrl = req.nextUrl.clone()
          middlewareAuthErrorRedirectUrl.pathname =
            authenticationFailureRedirectTo
          if (isDebug) {
            console.log(
              `♻️ [DEBUG] Middleware isWorkspace Authentication Failure 401 Redirect`,
              {
                middlewareAuthErrorRedirectUrl:
                  middlewareAuthErrorRedirectUrl.pathname,
              }
            )
          }
          return NextResponse.redirect(middlewareAuthErrorRedirectUrl)
        }

        // Check if the user is authorized to access the route
        try {
          await getIsPermittedInSaaSMiddleware({
            adminPaths,
            authUser: session.user as any,
            guestPaths,
            modulesConfig,
            pathname,
            subdomain: workspaceSlug,
            userAuthColumnKey,
            userModule,
            userPaths,
            validRoles,
          })(req)
        } catch (error) {
          // Block the user if they are not authorised to access this workspace
          console.error('Error caught at 403 Redirect:', error)
          const middlewareAuthErrorRedirectUrl = req.nextUrl.clone()
          middlewareAuthErrorRedirectUrl.pathname =
            authorizationFailureRedirectTo
          if (isDebug) {
            console.log(
              `♻️ [DEBUG] Middleware isWorkspace Authorization Failure 403 Redirect`,
              {
                error,
                middlewareAuthErrorRedirectUrl:
                  middlewareAuthErrorRedirectUrl.pathname,
                pathname,
              }
            )
          }
          return NextResponse.redirect(middlewareAuthErrorRedirectUrl)
        }

        // Allow user to pass through
        // Go to pages/_workspaces/[workspace]/*
        const nextPathname = `${dynamicPathParams}${url.pathname}`
        url.pathname = setPathnameBeforeSuccessRewrite
          ? setPathnameBeforeSuccessRewrite(nextPathname)
          : nextPathname
        if (isDebug) {
          console.log(`♻️ [DEBUG] Middleware isWorkspace Rewrite`, url.pathname)
        }
        return NextResponse.rewrite(url)
      }

      default: {
        if (isDebug) console.log(`♻️ [DEBUG] Middleware -> Default`)
        return NextResponse.next()
      }
    }
  }
}

export default SaasRouterMiddleware
