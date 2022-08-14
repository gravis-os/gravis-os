import saasConfig from '../config/saasConfig'
import { Workspace } from '../types'

const getIsAdminWorkspace = (workspace: Workspace): boolean => {
  if (!workspace) return false
  return workspace.title === saasConfig.ADMIN_WORKSPACE_TITLE
}

export default getIsAdminWorkspace
