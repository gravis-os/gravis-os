import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { CrudModule } from '@gravis-os/types'

const getWorkspaceStaticPathsByRoute = async ({
  supabaseAdmin,
  route,
  workspaceModule,
}: {
  supabaseAdmin: SupabaseClient
  route: string
  workspaceModule: CrudModule
}) => {
  const workspaceModuleSk = workspaceModule.sk

  const { data: workspaces } = await supabaseAdmin
    .from(workspaceModule.table.name)
    .select(`id, ${workspaceModuleSk}`)

  return {
    paths: workspaces?.map(
      (workspace) => `/_workspaces/${workspace[workspaceModuleSk]}${route}`
    ),
    fallback: false,
  }
}

export default getWorkspaceStaticPathsByRoute
