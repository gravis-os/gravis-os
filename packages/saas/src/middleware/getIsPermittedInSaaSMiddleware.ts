import { NextRequest } from 'next/server'
import {
  fetchWithSupabaseFromMiddleware,
  getMiddlewareRouteBreakdown,
} from '@gravis-os/middleware'
import { CrudModule } from '@gravis-os/types'
import saasConfig from '../config/saasConfig'
import getPersonRelationsFromPerson from '../utils/getPersonRelationsFromPerson'
import getIsValidPermissions from '../utils/getIsValidPermissions'

export interface GetIsPermittedInSaaSMiddlewareProps {
  authUser: { sub: string }
  userModule: CrudModule // The app's userModule
  modulesConfig: CrudModule[] // List of the app's modules
}

/**
 * getIsPermittedInSaaSMiddleware
 * Checks if the user is permitted to access the route
 * await getIsPermittedFromMiddleware({ authUser })(req)
 */
const getIsPermittedInSaaSMiddleware = (
  props: GetIsPermittedInSaaSMiddlewareProps
) => {
  const { authUser, userModule, modulesConfig } = props

  return async (req: NextRequest): Promise<boolean> => {
    // Handle degenerate cases
    if (!authUser) return false

    // Get parts of the route needed to calculate the permissions
    const { pathname, subdomain } = getMiddlewareRouteBreakdown(req)

    // 0. Fetch the dbUser based on authUser.sub
    const { data } = await fetchWithSupabaseFromMiddleware({
      from: userModule.table.name,
      select: userModule.select.detail,
      match: { id: authUser.sub },
    })

    // 1. Check if the user is permitted to access the dashboard
    const dbUser = data?.[0]
    if (!dbUser) throw new Error('No db user found!')

    // 2. Check if the user has the role to access the dashboard
    const person = dbUser.person?.[0] || {}
    const { role } = person
    const { permissions } = getPersonRelationsFromPerson(person)
    if (!role) throw new Error('No user role found!')

    // 3. Check if the role is a valid role by duck-typing the role title
    const roleTitle = role.title
    const isValidRole = saasConfig.VALID_ROLES.includes(roleTitle)
    if (!isValidRole) throw new Error('Invalid user role!')

    // 4. If this is a module route, check if the user has the permissions to access the module
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

    // 5. Check if the user has the permission to access this workspace
    const { workspace } = person
    const isValidWorkspace = workspace?.slug === subdomain
    const isAdmin = roleTitle === 'Super Admin' || roleTitle === 'Admin'
    if (!isAdmin && !isValidWorkspace) {
      throw new Error('Incorrect workspace!')
    }

    // Final: Only allow the user to pass through if all checks pass
    return true
  }
}

export default getIsPermittedInSaaSMiddleware
