import {
  Company,
  Feature,
  Permission,
  Person,
  Role,
  Tier,
  Workspace,
} from '@gravis-os/types'

import getIsAdminRole from './getIsAdminRole'
import getIsAdminWorkspace from './getIsAdminWorkspace'

export interface GetPersonRelationsFromPersonReturn {
  company?: Company
  featureTitles?: string[]

  features?: Feature[]
  hasFeature: (featureTitle: string) => boolean
  hasPermission: (permissionTitle: string) => boolean
  isAdmin: boolean

  // isAdmin
  isAdminWorkspace: boolean
  isNotAdmin: boolean
  permissionTitles?: string[]
  permissions?: Permission[]

  // Role & Permissions
  role?: Role
  // Tier & Features
  tier?: Tier
  workspace?: Workspace
}

/**
 * Flatten out the common relations for easy access
 */
const getPersonRelationsFromPerson = (
  person: Person
): GetPersonRelationsFromPersonReturn => {
  // Handle degenerate cases
  if (!person) return

  const { company, role, workspace } = person

  const { tier } = workspace || {}
  const features = tier?.feature
  const featureTitles = features?.map(({ title }) => title) || []

  const permissions = role?.permission
  const permissionTitles = features?.map(({ title }) => title) || []

  const isAdminRole = getIsAdminRole(role)

  return {
    company,
    features,

    featureTitles,
    hasFeature: (featureTitle: string) => featureTitles.includes(featureTitle),
    hasPermission: (permissionTitle: string) =>
      permissionTitles.includes(permissionTitle),
    // isAdmin
    isAdmin: isAdminRole,

    isAdminWorkspace: getIsAdminWorkspace(workspace),
    isNotAdmin: !isAdminRole,
    permissions,
    permissionTitles,

    // Role & Permissions
    role,
    // Tier & Features
    tier,
    workspace,
  }
}

export default getPersonRelationsFromPerson
