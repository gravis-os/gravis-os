import { CrudItem } from '@gravis-os/types'
import intersectionBy from 'lodash/intersectionBy'

const getRelatedCrudItemsByTagTitles = (
  items: CrudItem[],
  tagTitles: string[]
): CrudItem[] | [] => {
  if (!tagTitles?.length) return items || []

  return intersectionBy(
    items,
    tagTitles.map((tagTitle) => ({ title: tagTitle })),
    'title'
  )
}

export default getRelatedCrudItemsByTagTitles
