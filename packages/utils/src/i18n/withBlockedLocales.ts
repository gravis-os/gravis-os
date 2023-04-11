import { CrudItem } from '@gravis-os/types'

const withBlockedLocales =
  ({ locale }: { locale?: string }) =>
  (itemOrItems: CrudItem | CrudItem[]): CrudItem | CrudItem[] => {
    const isArrayItems = Array.isArray(itemOrItems)

    const filterByBlockedLocales = (item) => {
      const { blocked_locales } = item

      // Return the item if block_locale or locale are not available
      if (!blocked_locales || !locale) return item

      // Return the item if array is empty
      if (!blocked_locales?.length) return item

      // Return the item only if it does not exist in the array
      const isLocaleInBlockedLocales = blocked_locales.includes(locale)
      return !isLocaleInBlockedLocales && item
    }

    return isArrayItems
      ? itemOrItems.filter(filterByBlockedLocales)
      : filterByBlockedLocales(itemOrItems)
  }

export default withBlockedLocales
