import { CrudModule } from '@gravis-os/types'
import { useList } from '@gravis-os/query'

export interface UseListParentCategorysProps {
  categoryModule: CrudModule
  categoryTypeModule: CrudModule
  categoryTypeId?: number
}

const useListParentCategorys = (props: UseListParentCategorysProps) => {
  const { categoryModule, categoryTypeModule, categoryTypeId } = props

  const categoryType = categoryTypeModule.table.name

  const onUseList = useList({
    module: categoryModule,
    filters: [{ key: 'parent_id', op: 'is', value: null }],
    match: { [`${categoryType}_id`]: categoryTypeId },
    queryOptions: { enabled: Boolean(categoryTypeId) },
  })

  return onUseList
}

export default useListParentCategorys
