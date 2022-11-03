import { CrudItem, CrudModule } from '@gravis-os/types'
import { useQueryClient } from 'react-query'
import fetchIncrementCountRpc from './fetchIncrementCountRpc'

export interface UseUpdateIncrementCountProps {
  module: CrudModule
  countColumnName?: string
}

const useUpdateIncrementCount = (props: UseUpdateIncrementCountProps) => {
  const { module, countColumnName = 'view_count' } = props
  const queryClient = useQueryClient()

  const updateIncrementCount = async (item: CrudItem) => {
    if (!item || !module) return
    const onUpdate = await fetchIncrementCountRpc({
      item,
      module,
      countColumnName,
    })
    queryClient.invalidateQueries([module.table.name])
    return onUpdate
  }

  return {
    updateIncrementCount,
  }
}

export default useUpdateIncrementCount
