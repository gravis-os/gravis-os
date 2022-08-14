import { Permission, NavConfigItem } from '../types'
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

  return navConfig
    ?.map((navConfigItem) => {
      const { key } = navConfigItem

      const isAuthorized = getIsValidPermissions({
        // permissions e.g. ['company.create', 'product.*']
        permissions: permissions?.map(({ title }) => title),
        // key is the tableName e.g. 'company'
        moduleTableName: key,
      })

      return isAuthorized && navConfigItem
    })
    ?.filter(Boolean)
}

export default getNavConfigByPermissions
