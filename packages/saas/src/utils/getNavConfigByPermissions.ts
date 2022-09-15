import { Permission, NavConfigItem } from '@gravis-os/types'
import getIsValidPermissions from './getIsValidPermissions'

export interface GetNavConfigByPermissionsProps {
  permissions?: Permission[]
  navConfig: NavConfigItem[]
}

/**
 * getNavConfigByPermissions
 * Hide the navItems based on the user authz
 */
const getNavConfigByPermissions = (
  props: GetNavConfigByPermissionsProps
): NavConfigItem[] => {
  const { navConfig, permissions } = props

  // Handle degenerate cases
  if (!permissions?.length || !navConfig?.length) return []

  const mapPermittedNavItem = (navConfigItem) => {
    const { key, items } = navConfigItem

    const isNestedMenu = Boolean(items?.length)
    switch (true) {
      // isNestedMenu, recurse.
      case isNestedMenu:
        const permittedNestedNavItems = items.map(mapPermittedNavItem)
        const hasAtLeastOneAuthorizedNestedNavItem =
          permittedNestedNavItems.some(Boolean)
        return (
          hasAtLeastOneAuthorizedNestedNavItem && {
            ...navConfigItem,
            items: permittedNestedNavItems,
          }
        )
      // Default Case
      default:
        const isAuthorized = getIsValidPermissions({
          // permissions e.g. ['company.create', 'product.*']
          permissions: permissions?.map(({ title }) => title),
          // key is the tableName e.g. 'company'
          moduleTableName: key,
        })

        return isAuthorized && navConfigItem
    }
  }

  return navConfig?.map(mapPermittedNavItem)?.filter(Boolean)
}

export default getNavConfigByPermissions
