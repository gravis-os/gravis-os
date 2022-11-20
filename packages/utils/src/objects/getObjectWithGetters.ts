const getObjectWithGetters = (
  item: Record<string, unknown>,
  virtuals: Record<string, (item: Record<string, unknown>) => unknown>
) => {
  if (!item || !virtuals) return item

  const nextItem = { ...item }

  Object.entries(virtuals).forEach(([virtualKey, virtualFn]: any) => {
    Object.defineProperty(nextItem, virtualKey, {
      get() {
        return virtualFn(item)
      },
    })
  })

  return nextItem
}

export default getObjectWithGetters
