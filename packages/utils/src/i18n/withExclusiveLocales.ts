import { CrudItem } from '@gravis-os/types'

const withExclusiveLocales =
  ({ locale }: { locale?: string }) =>
  (itemOrItems: CrudItem | CrudItem[]): CrudItem | CrudItem[] => {
    const isArrayItems = Array.isArray(itemOrItems)

    const filterByExclusiveLocales = (item) => {
      const { exclusive_locales } = item

      // Return the item if exclusive_locale or locale are not available
      if (!exclusive_locales || !locale) return item

      // Return the item if array is empty
      if (!exclusive_locales?.length) return item

      // Return the item only if it exists in the array
      const isLocaleInExclusiveLocales = exclusive_locales.includes(locale)
      return isLocaleInExclusiveLocales && item
    }

    return isArrayItems
      ? itemOrItems.filter(filterByExclusiveLocales)
      : filterByExclusiveLocales(itemOrItems)
  }

export default withExclusiveLocales
