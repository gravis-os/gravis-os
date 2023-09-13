import { NextRequest } from 'next/server'
import { CrudModule } from '@gravis-os/types'
import { fetchDbUserFromMiddleware } from '@gravis-os/middleware'
import { isPathMatch, getGuestPaths } from '@gravis-os/utils/edge'
import saasConfig from '../config/saasConfig'
import getPersonRelationsFromDbUser from '../utils/getPersonRelationsFromDbUser'
import getIsValidPermissions from '../utils/getIsValidPermissions'
import getIsAdminRole from '../utils/getIsAdminRole'

export interface GetIsPermittedInSaaSMiddlewareProps {
  authUser: { id?: string; sub: string }
  userModule: CrudModule // The app's userModule
  userAuthColumnKey?: string // The column key in the userModule table that matches the authUser id
  modulesConfig: CrudModule[] // List of the app's modules

  // Get parts of the route needed to calculate the permissions
  pathname?: string
  subdomain?: string

  /**
   * A list of role.titles that are defined in the database
   * @default []
   */
  validRoles?: string[]
  /**
   * A list of paths that are accessible to guests
   * @default []
   */
  guestPaths?: string[]
}

/**
 * getIsPermittedInSaaSMiddleware
 * Checks if the user is permitted to access the route
 * await getIsPermittedFromMiddleware({ authUser })(req)
 */
const getIsPermittedInSaaSMiddleware = (
  props: GetIsPermittedInSaaSMiddlewareProps
) => {
  const {
    validRoles = [],
    guestPaths = [],
    authUser,
    userModule,
    userAuthColumnKey = 'id',
    modulesConfig,
    pathname,
    subdomain,
  } = props

  return async (req: NextRequest): Promise<boolean> => {
    // Handle degenerate cases
    if (!authUser) return false

    // 1. Check if the user is permitted to access the dashboard
    const dbUser = await fetchDbUserFromMiddleware({
      userModule,
      userAuthColumnKey,
      authUser,
    })
    if (!dbUser) throw new Error('No db user found!')

    // 2. Check if the user has the role to access the dashboard
    const { permissions, role, workspace } =
      getPersonRelationsFromDbUser(dbUser)
    if (!role) throw new Error('No user role found!')

    // 3. Check if the role is a valid role by duck-typing the role title
    const roleTitle = role.title
    const isValidRole = [
      ...saasConfig.DEFAULT_VALID_ROLES,
      ...validRoles,
    ].includes(roleTitle)
    if (!isValidRole) throw new Error('Invalid user role!')

    // 4. Check if the user is permitted to access the subdirectory defined in his/her role.
    const validSubdirectoryPathnames = role.valid_subdirectory_pathnames
    if (!validSubdirectoryPathnames) {
      throw new Error('Role `valid_subdirectory_pathnames` property missing!')
    }
    const validPaths = getGuestPaths([
      ...guestPaths,
      ...validSubdirectoryPathnames,
    ])
    const isPermittedToAccessSubdirectory = isPathMatch(pathname, validPaths)
    if (!isPermittedToAccessSubdirectory) {
      throw new Error('Invalid subdirectory for this role!')
    }

    // 5. If this is a module route, check if the user has the permissions to access the module
    // Get the module by the module route to find the table name
    const module = modulesConfig.find((module) =>
      pathname.startsWith(module?.route?.plural || '')
    )
    const moduleTableName = module?.table?.name
    const isValidPermissions = getIsValidPermissions({
      permissions: permissions?.map(({ title }) => title),
      moduleTableName,
    })
    // Only check for permissions if this pathname is a module
    if (!isValidPermissions && module) {
      throw new Error('Insufficient permissions!')
    }

    // 6. Check if the user has the permission to access this workspace
    const isValidWorkspace = workspace?.slug === subdomain
    const isAdmin = getIsAdminRole(role)
    if (!isAdmin && !isValidWorkspace) {
      throw new Error('Incorrect workspace!')
    }

    // Final: Only allow the user to pass through if all checks pass
    return true
  }
}

export default getIsPermittedInSaaSMiddleware
