import { supabaseClient } from '@supabase/auth-helpers-nextjs'

export const updateIncrementCount = async ({
  item,
  module,
  countColumnName = 'view_count',
}) => {
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

export default updateIncrementCount
