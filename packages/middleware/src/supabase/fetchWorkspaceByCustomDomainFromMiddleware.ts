import fetchWithSupabaseFromMiddleware from './fetchWithSupabaseFromMiddleware'

export interface FetchWorkspaceByCustomDomainFromMiddlewareProps {
  customDomain: string // Non-www nakedCustomDomain 'evfy.com'
}

/**
 * Fetch workspace by custom domain
 */
const fetchWorkspaceByCustomDomainFromMiddleware = async (
  props: FetchWorkspaceByCustomDomainFromMiddlewareProps
) => {
  const { customDomain } = props

  if (!customDomain) return

  const { data } = await fetchWithSupabaseFromMiddleware({
    from: 'workspace',
    match: { custom_domain: customDomain },
    select: 'id, title, slug, custom_domain',
  })

  return data?.[0]
}

export default fetchWorkspaceByCustomDomainFromMiddleware
