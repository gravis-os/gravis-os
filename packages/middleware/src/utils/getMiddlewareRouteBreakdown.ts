import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

import fetchWorkspaceByCustomDomainFromMiddleware from '../supabase/fetchWorkspaceByCustomDomainFromMiddleware'

export interface GetMiddlewareRouteBreakdownOptions {
  subdomainOverride?: string
}

/**
 * getMiddlewareRouteBreakdown
 *
 * Breakdown routes into usable parts for consumption within a NextJS Middleware
 */
const getMiddlewareRouteBreakdown = async (
  req: NextRequest,
  options: GetMiddlewareRouteBreakdownOptions = {}
) => {
  const { subdomainOverride } = options
  const url = req.nextUrl.clone()
  const { locale, pathname } = url || {}

  const hostname = req.headers.get('host') || ''
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const nakedDomain =
    process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL?.split('://')?.at(-1)
  const isVercel = process.env.VERCEL === '1'

  // ==============================
  // Custom Domain
  // ==============================
  // This is a custom domain e.g. www.evfy.com if hostname does not contain 'marketbolt.io'
  const isCustomDomain = !hostname.includes(nakedDomain)
  // Ensure to strip out the www.evfy.com
  const nakedCustomDomain = isCustomDomain && hostname.replace('www.', '')
  // If this is a custom domain, then retrieve the workspace for it by querying the database.
  const customDomainWorkspace =
    await fetchWorkspaceByCustomDomainFromMiddleware({
      customDomain: nakedCustomDomain,
    })

  /**
   * You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
   * You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
   * in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
   * still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard.
   */
  const currentHost =
    subdomainOverride ||
    (isVercel
      ? customDomainWorkspace?.slug || hostname.replace(`.${nakedDomain}`, '')
      : hostname.replace(`.localhost:3000`, ''))

  const subdomain =
    subdomainOverride ||
    (customDomainWorkspace?.slug || currentHost !== hostname ? currentHost : '') // e.g. merrymaker
  const workspacesPathnamePrefix = `/_workspaces/${currentHost}` // e.g. '/_workspaces/evfy'

  const isApiRoute = pathname.startsWith('/api')
  const isAuthRoute = pathname.startsWith('/auth')
  const isLoginRoute = pathname === '/auth/login'
  const isBaseRoute = !subdomain && currentHost === hostname // e.g. localhost:3000
  const isWorkspace = Boolean(subdomain) // e.g. subdomain.localhost:3000
  const isWorkspaceBaseRoute = isWorkspace && pathname === '/' // e.g. subdomain.localhost:3000/

  // Check for authUser
  const supabase = createMiddlewareClient({
    req,
    res: NextResponse.next(),
  })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const authUser = session?.user
  const isLoggedIn = Boolean(authUser?.id)

  const result = {
    // Auth
    authUser,
    currentHost,
    customDomainWorkspace,
    hostname,
    // Checks
    isApiRoute,
    isAuthRoute,
    isBaseRoute,
    // Custom Domain
    isCustomDomain,

    isLoggedIn,
    isLoginRoute,
    isWorkspace,
    isWorkspaceBaseRoute,
    // Locale
    locale,
    nakedCustomDomain,
    nakedDomain,

    pathname,

    protocol,
    subdomain,
    url,

    workspacesPathnamePrefix,
  }

  return result
}

export default getMiddlewareRouteBreakdown
