import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

import fetchWorkspaceByCustomDomainFromMiddleware from '../supabase/fetchWorkspaceByCustomDomainFromMiddleware'

export interface GetMiddlewareRouteBreakdownOptions {
  hasNestedSubdomain?: boolean
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
  const { hasNestedSubdomain, subdomainOverride = '' } = options
  const url = req.nextUrl.clone()
  const { locale, pathname } = url || {}

  const hostname = req.headers.get('host') || ''
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const nakedDomain =
    process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL?.split('://')?.at(-1)

  const isProduction = process.env.NODE_ENV === 'production'
  const isVercel = process.env.VERCEL === '1'
  const isVercelProduction = isProduction && isVercel

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
   *
   * ## currentSubdomain is different from subdomain.
   *
   * currentSubdomain is the full path before the domain of which the user has entered into the url bar.
   * e.g.'lorem-ipsum.foo-123'
   *
   * subdomain ignores the user input and only returns the database workspace slug value.
   * e.g. 'foo-123'
   */
  const currentSubdomain =
    subdomainOverride ||
    (isVercelProduction
      ? customDomainWorkspace?.slug || hostname.replace(`.${nakedDomain}`, '')
      : hostname.replace(`.localhost:3000`, ''))

  /**
   * First we check if there is a subdomainOverride, if there is, then we use that.
   *
   * Secondly, if there is no subdomainOverride, then we check if there is a customDomainWorkspace where we fetch
   * the domain name to get the workspace slug from the database instead.
   *
   * Thirdly, if there is no customDomainWorkspace, then we check if the currentSubdomain is the same as the hostname
   *
   * e.g. 'evfy'
   */
  const workspaceSlug =
    subdomainOverride ||
    (customDomainWorkspace?.slug || currentSubdomain !== hostname
      ? currentSubdomain
      : '')

  const getDynamicPathParams = (currentSubdomain: string) => {
    if (!hasNestedSubdomain) return `/_workspaces/${currentSubdomain}`

    /**
     * If there is a nested subdomain, then we need to split the currentSubdomain into two parts.
     *
     * Nested subdomain pattern: portalSlug-portalType.workspaceSlug
     *
     * Nested subdomain example: showcase-2023-site.one-x
     * Expected directory structure: _workspaces/[workspaceSlug]/[portalType]/[portalSlug]
     * Expected dynamicPathParams: _workspaces/one-x/site/showcase-2023
     */
    const [portalSlugAndType, workspaceSlug] = currentSubdomain.split('.') // e.g. ['showcase-2023-site', 'one-x']
    const portalType = portalSlugAndType.split('-').at(-1) // e.g. 'site'
    const portalSlug = portalSlugAndType.split('-').slice(0, -1).join('-') // e.g. 'showcase-2023'

    return [`/_workspaces`, workspaceSlug, portalType, portalSlug]
      .filter(Boolean)
      .join('/')
  }
  /**
   * This is the output that will be used to prefix all routes for the workspace.
   * e.g. /_workspaces/[workspaceSlug] -> /_workspaces/evfy
   * This corresponds to the folder structure in the app directory.
   */
  const dynamicPathParams = getDynamicPathParams(currentSubdomain)

  const isApiRoute = pathname.startsWith('/api')
  const isAuthRoute = pathname.startsWith('/auth')
  const isLoginRoute = pathname === '/auth/login'
  const isBaseRoute = !workspaceSlug && currentSubdomain === hostname // e.g. localhost:3000
  const isWorkspace = Boolean(workspaceSlug)
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
    currentSubdomain,
    customDomainWorkspace,
    dynamicPathParams,
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
    url,

    workspaceSlug,
  }

  return result
}

export default getMiddlewareRouteBreakdown
