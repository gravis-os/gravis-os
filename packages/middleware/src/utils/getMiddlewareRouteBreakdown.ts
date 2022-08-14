import { NextRequest } from 'next/server'

/**
 * getMiddlewareRouteBreakdown
 *
 * Breakdown routes into usable parts for consumption within a NextJS Middleware
 */
const getMiddlewareRouteBreakdown = (req: NextRequest) => {
  const url = req.nextUrl.clone()
  const { pathname } = url || {}
  const hostname = req.headers.get('host') || ''
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const nakedDomain =
    process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL?.split('://')?.reverse()?.[0]

  /**
   * You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
   * You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
   * in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
   * still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard.
   */
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.${nakedDomain}`, '')
      : hostname.replace(`.localhost:3000`, '')

  const subdomain = currentHost !== hostname ? currentHost : '' // e.g. merrymaker

  const isApiRoute = pathname.startsWith('/api')
  const isAuthRoute = pathname.startsWith('/auth')
  const isLoginRoute = pathname === '/auth/login'
  const isBaseRoute = currentHost === hostname // e.g. localhost:3000
  const isSubdomain = Boolean(subdomain) // e.g. subdomain.localhost:3000
  const isSubdomainWithBaseRoute = isSubdomain && pathname === '/' // e.g. subdomain.localhost:3000/
  const isLoggedIn = Boolean(req.cookies['sb-access-token'])

  const result = {
    url,
    hostname,
    protocol,
    pathname,
    currentHost,
    nakedDomain,
    subdomain,

    // Checks
    isApiRoute,
    isAuthRoute,
    isLoginRoute,
    isBaseRoute,
    isSubdomain,
    isSubdomainWithBaseRoute,
    isLoggedIn,
  }

  if (process.env.DEBUG === 'true' && !isApiRoute) console.log('Routes', result)

  return result
}

export default getMiddlewareRouteBreakdown
