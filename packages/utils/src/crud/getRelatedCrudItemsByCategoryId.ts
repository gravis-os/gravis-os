import { CrudItem } from '@gravis-os/types'

const getRelatedCrudItemsByCategoryId = (
  items: Array<CrudItem & { category_id: number }>,
  category_id: number
): [] | CrudItem[] => {
  if (!category_id) return items || []
  return items.filter((item) => item.category_id === category_id)
}

export default getRelatedCrudItemsByCategoryId
