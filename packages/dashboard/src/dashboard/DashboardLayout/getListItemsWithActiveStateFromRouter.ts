import { ListItemProps } from '@gravis-os/ui'
import { NextRouter } from 'next/router'

/**
 * getListItemsWithActiveStateFromRouter
 * Loop through the
 */
const getListItemsWithActiveStateFromRouter = (
  listItems: ListItemProps['items'],
  router?: NextRouter
): ListItemProps['items'] => {
  // Handle degenerate cases
  if (!listItems?.length) return []

  const mapListItemWithActiveStateFromRouter = (listItem) => {
    const { key, href, items } = listItem

    const isNestedMenu = Boolean(items?.length)
    const isCurrentPath = router.pathname.endsWith(href)

    // Set ListItem.selected to true if the current path matches the href
    const nextListItem = isCurrentPath
      ? { ...listItem, selected: true }
      : listItem

    switch (true) {
      // isNestedMenu, recurse.
      case isNestedMenu:
        const nextItems = items.map(mapListItemWithActiveStateFromRouter)

        // Open the nested menu if its children is selected
        const hasActiveStateInNestedMenuItems = nextItems.some(
          ({ selected }) => selected
        )

        return {
          ...nextListItem,
          open: hasActiveStateInNestedMenuItems,
          items: nextItems,
        }
      // Default Case
      default:
        return nextListItem
    }
  }

  return listItems?.map(mapListItemWithActiveStateFromRouter)?.filter(Boolean)
}

export default getListItemsWithActiveStateFromRouter
