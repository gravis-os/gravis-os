// TODO@Joel: Type this
// import { Company, Permission, Tier, Feature } from '@prisma/client'
// import { AppPerson, AppRole, AppWorkspace } from '../app/types'

// export interface GetPersonRelationsFromPersonReturn {
//   workspace?: AppWorkspace
//   tier?: Tier
//   company?: Company
//   role?: AppRole
//   permissions?: Permission[]
//   features?: Feature[]
//   featureTitles: string[]
//   hasFeature: (featureTitle: string) => boolean
// }

export interface AppPerson {
  company: any
  role: any
  workspace: any
}

export interface GetPersonRelationsFromPersonReturn {
  permissions: any
  company: any
  workspace: any
  tier: any
  role: any
  features: any
  featureTitles: string[]
  hasFeature: (featureTitle: string) => boolean
}

/**
 * Flatten out the common relations for easy access
 */
const getPersonRelationsFromPerson = (
  person: AppPerson
): GetPersonRelationsFromPersonReturn => {
  const { workspace, role } = person

  const featureTitles =
    workspace?.tier?.feature?.map(({ title }) => title) || []
  const roleTitle = role?.title

  // TODO@Joel: Abstract this
  const isAdminRole = roleTitle === 'Super Admin' || roleTitle === 'Admin'
  const isAdminWorkspace = workspace?.title === 'Admin'

  return {
    company: person.company,
    workspace,
    role,
    permissions: person.role?.permission,
    tier: person.workspace?.tier,
    features: person.workspace?.tier?.feature,
    featureTitles,
    hasFeature: (featureTitle: string) => {
      return featureTitles.includes(featureTitle)
    },
  }
}

export default getPersonRelationsFromPerson
