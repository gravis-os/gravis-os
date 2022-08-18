import { Workspace } from '@gravis-os/types'
import saasConfig from '../config/saasConfig'

const getIsAdminWorkspace = (workspace: Workspace): boolean => {
  if (!workspace) return false
  return workspace.title === saasConfig.ADMIN_WORKSPACE_TITLE
}

export default getIsAdminWorkspace
