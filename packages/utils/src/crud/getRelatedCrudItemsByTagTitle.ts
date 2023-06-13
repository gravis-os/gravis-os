import { CrudItem } from '@gravis-os/types'

const getRelatedCrudItemsByTagTitle = (
  items: Array<CrudItem & { tags: CrudItem[] }>,
  tagTitle: string
): CrudItem[] | [] => {
  if (!tagTitle) return []
  return items.filter(({ tags }) => {
    const tagTitles = tags.map(({ title }) => title)
    return tagTitles.includes(tagTitle)
  })
}

export default getRelatedCrudItemsByTagTitle
