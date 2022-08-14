import saasConfig from '../config/saasConfig'
import { Role } from '../types'

const getIsAdminRole = (role: Role): boolean => {
  if (!role) return false
  return saasConfig.ADMIN_ROLES.includes(role.title)
}

export default getIsAdminRole
