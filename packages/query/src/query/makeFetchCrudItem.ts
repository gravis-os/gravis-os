import { CrudModule } from '@gravis-os/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

// along with https://github.com/onextech/wmc/blob/develop/packages/dashboard/src/lib/useFetch/initUseFetch.tsx
export interface MakeFetchCrudItemProps {
  module: CrudModule
  skValue: boolean | number | string
}

/**
 * makeFetchCrudItem
 * A factory function that returns a function that fetches a single item from a Supabase table
 * @param props
 * @usage
 * const fetchWorkspaceBySlug = (workspaceSlug: string) =>
 *   makeFetchCrudItem({ module: workspaceModule, skValue: workspaceSlug })
 */
const makeFetchCrudItem = (props: MakeFetchCrudItemProps) => async () => {
  const { module, skValue } = props
  return supabaseClient
    .from(module.table.name)
    .select(module?.select?.detail)
    .match({ [module.sk]: skValue })
    .single()
}

export default makeFetchCrudItem
