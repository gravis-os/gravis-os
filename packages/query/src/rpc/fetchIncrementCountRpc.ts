import { CrudItem, CrudModule } from '@gravis-os/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export interface FetchIncrementCountRpcProps {
  countColumnName?: string
  item: CrudItem
  module: CrudModule
}

export const fetchIncrementCountRpc = async ({
  countColumnName = 'view_count',
  item,
  module,
}: FetchIncrementCountRpcProps) => {
  return supabase.rpc('increment_count', {
    count_column_name: countColumnName,
    slug_key: module.sk,
    // We cast later on in the function.
    slug_value: String(item[module.sk]),
    // Always send in string because Postgres Function
    // only accepts static types in the arguemnts.
    table_name: module.table.name,
  })
}

export default fetchIncrementCountRpc
