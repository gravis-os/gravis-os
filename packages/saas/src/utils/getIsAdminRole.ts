import { Role } from '@gravis-os/types'
import saasConfig from '../config/saasConfig'

const getIsAdminRole = (role: Role): boolean => {
  if (!role) return false
  return saasConfig.ADMIN_ROLES.includes(role.title)
}

export default getIsAdminRole
