import { CrudItem } from '@gravis-os/types'

const getIsNew = (item?: CrudItem | Record<string, unknown>): boolean => {
  const hasItem = item && Object.keys(item).length > 0
  const isNew = !hasItem

  return isNew
}

export default getIsNew
