import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { CrudModule } from '@gravis-os/types'

const getWorkspaceStaticPathsByRoute = async ({
  supabaseAdmin,
  route,
  workspaceModule,
  locales,
}: {
  supabaseAdmin: SupabaseClient
  route: string
  workspaceModule: CrudModule
  locales?: string[]
}) => {
  const workspaceModuleSk = workspaceModule.sk

  const { data: workspaces } = await supabaseAdmin
    .from(workspaceModule.table.name)
    .select(`id, ${workspaceModuleSk}`)

  return {
    paths: locales
      ? workspaces
          ?.map((workspace) =>
            locales.map((locale) => ({
              params: { workspace: `${workspace[workspaceModuleSk]}` },
              locale,
            }))
          )
          .flat()
      : workspaces?.map(
          (workspace) => `/_workspaces/${workspace[workspaceModuleSk]}${route}`
        ),
    fallback: false,
  }
}

export default getWorkspaceStaticPathsByRoute
