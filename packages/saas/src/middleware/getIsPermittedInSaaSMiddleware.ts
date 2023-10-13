import { fetchDbUserFromMiddleware } from '@gravis-os/middleware'
import { CrudModule } from '@gravis-os/types'
import { getGuestPaths, isPathMatch } from '@gravis-os/utils/edge'
import { NextRequest } from 'next/server'

import saasConfig from '../config/saasConfig'
import getIsAdminRole from '../utils/getIsAdminRole'
import getIsValidPermissions from '../utils/getIsValidPermissions'
import getPersonRelationsFromDbUser from '../utils/getPersonRelationsFromDbUser'

export interface GetIsPermittedInSaaSMiddlewareProps {
  authUser: { id?: string; sub: string }
  /**
   * A list of paths that are accessible to guests
   * @default []
   */
  guestPaths?: string[]
  modulesConfig: CrudModule[] // List of the app's modules
  // Get parts of the route needed to calculate the permissions
  pathname?: string

  subdomain?: string
  userAuthColumnKey?: string // The column key in the userModule table that matches the authUser id

  userModule: CrudModule // The app's userModule
  /**
   * A list of role.titles that are defined in the database
   * @default []
   */
  validRoles?: string[]
}

const getValidPathsByRole = (role) => {
  const { title } = role
  switch (title) {
    case 'Super Admin':
    case 'Admin': {
      return ['/admin/*', '/dashboard/*', '/account/*']
    }
    case 'Workspace Superadmin':
    case 'Workspace Owner': {
      return ['/admin/*', '/dashboard/*', '/account/*']
    }
    default: {
      return []
    }
  }
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
    authUser,
    guestPaths = [],
    modulesConfig,
    pathname,
    subdomain,
    userAuthColumnKey = 'id',
    userModule,
    validRoles = [],
  } = props

  return async (req: NextRequest): Promise<boolean> => {
    // Handle degenerate cases
    if (!authUser) return false

    // 1. Check if the user is permitted to access the dashboard
    const dbUser = await fetchDbUserFromMiddleware({
      authUser,
      userAuthColumnKey,
      userModule,
    })
    if (!dbUser) throw new Error('No db user found!')

    // 2. Check if the user has the role to access the dashboard
    const {
      permissions: personPermissions,
      role,
      workspace,
    } = dbUser?.person?.[0] ? getPersonRelationsFromDbUser(dbUser) : dbUser
    if (!role) throw new Error('No user role found!')

    const permissions = personPermissions ?? role.permission

    // 3. Check if the role is a valid role by duck-typing the role title
    const roleTitle = role.title
    const isValidRole = [
      ...saasConfig.DEFAULT_VALID_ROLES,
      ...validRoles,
    ].includes(roleTitle)
    if (!isValidRole) throw new Error('Invalid user role!')

    // 4. Check if the user is permitted to access the subdirectory defined in his/her role.
    const validPaths = getGuestPaths([
      ...guestPaths,
      ...getValidPathsByRole(role),
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
      moduleTableName,
      permissions: permissions?.map(({ title }) => title),
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
