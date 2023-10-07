/**
 * Manually simulate the supabase because at this point we are
 * unable to import supabase in the Next middleware as
 * the @supabase/supabase-js library is not compatible with NextJS middleware yet.
 * @issue https://github.com/supabase/supabase/issues/3783
 *
 * So, we're constructing our own light-weight fetcher here.
 */
const fetchWithSupabaseFromMiddleware = async ({
  config,
  from,
  match,
  select = '*',
}: {
  config?: Record<string, unknown> & { headers?: Record<string, unknown> }
  from: string // table.name
  match?: Record<string, string>
  select?: string
}) => {
  const matchString =
    match &&
    Object.entries(match)
      .reduce((acc, [key, value]) => {
        return acc.concat(`${key}=eq.${value}`)
      }, [] as string[])
      .join('&')

  const params = [`select=${select}`, matchString].filter(Boolean).join('&')

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${from}?${params}`,
    {
      ...config,
      headers: {
        apiKey: `${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        ...config?.headers,
      },
    }
  )
  const data = await result.json()

  return { data }
}

export default fetchWithSupabaseFromMiddleware
