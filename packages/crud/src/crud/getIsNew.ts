import { CrudItem } from './typings'

const getIsNew = (item?: CrudItem | Record<string, unknown>): boolean => {
  const hasItem = item && Object.keys(item).length
  const isNew = !hasItem

  return isNew
}

export default getIsNew
