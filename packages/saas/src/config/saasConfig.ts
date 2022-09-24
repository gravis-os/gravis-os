const ADMIN_WORKSPACE_TITLE = 'Admin' // Reserved name for the admin panel workspace
const ADMIN_ROLES = ['Super Admin', 'Admin']
const WORKSPACE_ROLES = [
  'Workspace Owner',
  'Workspace Manager',
  'Workspace Employee',
]

const saasConfig = {
  ADMIN_ROLES,
  ADMIN_WORKSPACE_TITLE,
  WORKSPACE_ROLES,
  VALID_ROLES: [...ADMIN_ROLES, ...WORKSPACE_ROLES],
}

export default saasConfig
