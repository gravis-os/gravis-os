import { CrudItem } from '@gravis-os/types'

const getCategoryFromCrudItem = (
  item: CrudItem & { category_id?: number },
  categorys: CrudItem[]
): CrudItem => {
  return (
    categorys?.find((category) => category.id === item?.category_id) ||
    ({} as CrudItem)
  )
}

export default getCategoryFromCrudItem
