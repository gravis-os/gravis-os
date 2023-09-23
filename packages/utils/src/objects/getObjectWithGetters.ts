/* eslint-disable fp/no-loops, fp/no-mutating-methods, unicorn/no-array-for-each */

import { CrudItem } from '@gravis-os/types'

const getObjectWithGetters = (
  item: CrudItem,
  virtuals: Record<string, (item: CrudItem) => unknown>
): CrudItem => {
  if (!item || !virtuals) return item

  const nextItem = { ...item }

  Object.entries(virtuals).forEach(([virtualKey, virtualFn]: any) => {
    Object.defineProperty(nextItem, virtualKey, {
      get() {
        return virtualFn(item)
      },
    })
  })

  return nextItem as CrudItem
}

export default getObjectWithGetters
