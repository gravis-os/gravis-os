import { CrudModule } from '@gravis-os/types'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

const getWorkspaceStaticPathsByRoute = async ({
  fallback = false, // By default generate all paths, else 404.
  locales,
  params: injectedParams,
  route,
  supabaseClient,
  workspaceModule,
}: {
  fallback?: boolean
  locales?: string[]
  params?: Record<string, string>
  route: string
  supabaseClient: SupabaseClient
  workspaceModule: CrudModule
}) => {
  const workspaceModuleSk = workspaceModule.sk

  const { data: workspaces } = await supabaseClient
    .from(workspaceModule.table.name)
    .select(`id, ${workspaceModuleSk}`)

  const nextLocales = !process.env.DISABLE_LOCALES && locales

  return {
    fallback,
    paths: nextLocales
      ? workspaces
          ?.map((workspace) =>
            nextLocales.map((locale) => ({
              locale,
              params: {
                workspace: `${workspace[workspaceModuleSk]}`,
                ...injectedParams,
              },
            }))
          )
          .flat()
      : workspaces?.map(
          (workspace) => `/_workspaces/${workspace[workspaceModuleSk]}${route}`
        ),
  }
}

export default getWorkspaceStaticPathsByRoute
