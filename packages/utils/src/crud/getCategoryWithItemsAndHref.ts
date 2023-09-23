import { CrudItem } from '@gravis-os/types'

import getCategoryFromCrudItem from './getCategoryFromCrudItem'
import getCrudItemsByCategory, {
  GetCrudItemsByCategoryReturn,
} from './getCrudItemsByCategory'

function getCategoryWithItemsAndHref<
  Item extends CrudItem,
  Category extends CrudItem
>(
  items: Array<Item & { category_id?: number }>,
  categorys: Array<Category>,
  baseRoute: string
): GetCrudItemsByCategoryReturn {
  const itemsWithHref = items.map((item) => {
    if (!item.category_id) return item
    const category = getCategoryFromCrudItem(item, categorys)
    const href = `${baseRoute}/${category.slug}/${item.slug}`
    return { ...item, href }
  })

  const categorysWithHref = categorys.map((category) => ({
    ...category,
    href: `${baseRoute}/${category.slug}`,
  }))

  return getCrudItemsByCategory(itemsWithHref, categorysWithHref)
}

export default getCategoryWithItemsAndHref
