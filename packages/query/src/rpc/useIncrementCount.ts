import { useEffect } from 'react'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

export interface UseIncrementCountProps {
  item: CrudItem
  module: CrudModule
  countColumnName?: string
}

const useIncrementCount = (props: UseIncrementCountProps) => {
  const { item, module, countColumnName = 'view_count' } = props

  const incrementCount = async () => {
    if (!item || !module) return

    return supabaseClient.rpc('increment_count', {
      table_name: module.table.name,
      count_column_name: countColumnName,
      slug_key: module.sk,
      slug_value: item[module.sk],
    })
  }

  useEffect(() => {
    incrementCount()
  }, [])
}

export default useIncrementCount
