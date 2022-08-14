/**
 * Manually simulate the supabaseClient because at this point we are
 * unable to import supabaseClient in the Next middleware as
 * the @supabase/supabase-js library is not compatible with NextJS middleware yet.
 * @issue https://github.com/supabase/supabase/issues/3783
 *
 * So, we're constructing our own light-weight fetcher here.
 */
const fetchWithSupabaseFromMiddleware = async ({
  from,
  select = '*',
  match,
  config,
}: {
  from: string // table.name
  select?: string
  match?: Record<string, string>
  config?: Record<string, unknown> & { headers?: Record<string, unknown> }
}) => {
  // const axiosMiddlewareClient = getAxiosMiddlewareClient()

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
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apiKey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        ...config?.headers,
      },
    }
  )
  const data = await result.json()

  return { data }
}

export default fetchWithSupabaseFromMiddleware
