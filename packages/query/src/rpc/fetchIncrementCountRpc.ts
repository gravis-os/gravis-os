import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { CrudItem, CrudModule } from '@gravis-os/types'

export interface FetchIncrementCountRpcProps {
  item: CrudItem
  module: CrudModule
  countColumnName?: string
}

export const fetchIncrementCountRpc = async ({
  item,
  module,
  countColumnName = 'view_count',
}: FetchIncrementCountRpcProps) => {
  return supabaseClient.rpc('increment_count', {
    table_name: module.table.name,
    count_column_name: countColumnName,
    slug_key: module.sk,
    // Always send in string because Postgres Function
    // only accepts static types in the arguemnts.
    // We cast later on in the function.
    slug_value: String(item[module.sk]),
  })
}

export default fetchIncrementCountRpc
