import getIsValidPermissions from './getIsValidPermissions'

// TODO@Joel: Type this
type Permission = any
export type NavMenuItem = any

export interface GetNavConfigByPermissionsProps {
  permissions?: Permission[]
  navConfig: NavMenuItem[]
}

/**
 * getNavConfigByPermissions
 *
 * Hide the navItems based on the user authz
 * @param props
 */
const getNavConfigByPermissions = (
  props: GetNavConfigByPermissionsProps
): NavMenuItem[] => {
  const { navConfig, permissions } = props

  // Handle degenerate cases
  if (!permissions || !navConfig) return []

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
