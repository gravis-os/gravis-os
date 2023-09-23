import { CrudItem } from '@gravis-os/types'
import groupBy from 'lodash/groupBy'

export type GetCrudItemsByCategoryReturn = Array<
  CrudItem & { items: CrudItem[] }
>

const getCrudItemsByCategory = (
  items: CrudItem[],
  categorys: CrudItem[],
  options: { relationKey?: string } = {}
): GetCrudItemsByCategoryReturn => {
  const { relationKey = 'category_id' } = options
  return Object.entries(groupBy(items, relationKey)).reduce(
    (acc, [categoryId, categoryItems]) => {
      const category = categorys.find(({ id }) => id === Number(categoryId))
      return acc.concat({ ...category, items: categoryItems })
    },
    []
  )
}

export default getCrudItemsByCategory
