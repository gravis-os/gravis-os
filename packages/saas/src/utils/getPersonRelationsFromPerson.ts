import {
  Person,
  Role,
  Workspace,
  Company,
  Permission,
  Tier,
  Feature,
} from '../types'
import getIsAdminRole from './getIsAdminRole'
import getIsAdminWorkspace from './getIsAdminWorkspace'

export interface GetPersonRelationsFromPersonReturn {
  workspace?: Workspace
  company?: Company

  // Role & Permissions
  role?: Role
  permissions?: Permission[]
  permissionTitles?: string[]
  hasPermission: (permissionTitle: string) => boolean

  // Tier & Features
  tier?: Tier
  features?: Feature[]
  featureTitles?: string[]
  hasFeature: (featureTitle: string) => boolean

  // isAdmin
  isAdminWorkspace: boolean
  isAdminRole: boolean
}

/**
 * Flatten out the common relations for easy access
 */
const getPersonRelationsFromPerson = (
  person: Person
): GetPersonRelationsFromPersonReturn => {
  // Handle degenerate cases
  if (!person) return

  const { company, workspace, role } = person

  const { tier } = workspace || {}
  const features = tier?.feature
  const featureTitles = features?.map(({ title }) => title)

  const permissions = role?.permission
  const permissionTitles = features?.map(({ title }) => title)

  return {
    company,
    workspace,

    // Role & Permissions
    role,
    permissions,
    permissionTitles,
    hasPermission: (permissionTitle: string) =>
      permissionTitles.includes(permissionTitle),

    // Tier & Features
    tier,
    features,
    featureTitles,
    hasFeature: (featureTitle: string) => featureTitles.includes(featureTitle),

    // isAdmin
    isAdminRole: getIsAdminRole(role),
    isAdminWorkspace: getIsAdminWorkspace(workspace),
  }
}

export default getPersonRelationsFromPerson
