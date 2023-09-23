import { useList } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'

export interface UseListParentCategorysProps {
  categoryModule: CrudModule
  categoryTypeId?: number
  categoryTypeModule: CrudModule
}

const useListParentCategorys = (props: UseListParentCategorysProps) => {
  const { categoryModule, categoryTypeId, categoryTypeModule } = props

  const categoryType = categoryTypeModule.table.name

  const onUseList = useList({
    filters: [{ key: 'parent_id', op: 'is', value: null }],
    match: { [`${categoryType}_id`]: categoryTypeId },
    module: categoryModule,
    queryOptions: { enabled: Boolean(categoryTypeId) },
  })

  return onUseList
}

export default useListParentCategorys
