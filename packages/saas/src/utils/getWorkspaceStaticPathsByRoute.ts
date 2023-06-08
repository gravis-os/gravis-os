import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { CrudModule } from '@gravis-os/types'

const getWorkspaceStaticPathsByRoute = async ({
  supabaseClient,
  route,
  workspaceModule,
  locales,
  params: injectedParams,
  fallback = false, // By default generate all paths, else 404.
}: {
  supabaseClient: SupabaseClient
  route: string
  workspaceModule: CrudModule
  locales?: string[]
  params?: Record<string, string>
  fallback?: boolean
}) => {
  const workspaceModuleSk = workspaceModule.sk

  const { data: workspaces } = await supabaseClient
    .from(workspaceModule.table.name)
    .select(`id, ${workspaceModuleSk}`)

  const nextLocales = process.env.DISABLE_LOCALES ? [] : locales

  return {
    paths: nextLocales
      ? workspaces
          ?.map((workspace) =>
            nextLocales.map((locale) => ({
              params: {
                workspace: `${workspace[workspaceModuleSk]}`,
                ...injectedParams,
              },
              locale,
            }))
          )
          .flat()
      : workspaces?.map(
          (workspace) => `/_workspaces/${workspace[workspaceModuleSk]}${route}`
        ),
    fallback,
  }
}

export default getWorkspaceStaticPathsByRoute
