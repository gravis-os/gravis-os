import { useQueryClient } from 'react-query'

import { CrudItem, CrudModule } from '@gravis-os/types'

import fetchIncrementCountRpc from './fetchIncrementCountRpc'

export interface UseUpdateIncrementCountProps {
  countColumnName?: string
  module: CrudModule
}

const useUpdateIncrementCount = (props: UseUpdateIncrementCountProps) => {
  const { countColumnName = 'view_count', module } = props
  const queryClient = useQueryClient()

  const updateIncrementCount = async (item: CrudItem) => {
    if (!item || !module) return
    const onUpdate = await fetchIncrementCountRpc({
      countColumnName,
      item,
      module,
    })
    queryClient.invalidateQueries([module.table.name])
    return onUpdate
  }

  return {
    updateIncrementCount,
  }
}

export default useUpdateIncrementCount
