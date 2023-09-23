const getIsValidPermissions = ({
  moduleTableName,
  permissions,
}: {
  moduleTableName?: string // e.g. 'contact'
  permissions?: string[] // e.g. ['company.create', 'user.*']
}) => {
  if (!permissions?.length || !moduleTableName) return false

  // Check if user has all permissions
  const hasWildcardPermission = permissions.includes('*')
  if (hasWildcardPermission) return true

  // Check individual permissions by module
  return (permissions as string[]).some((permission) =>
    permission.startsWith(`${moduleTableName}.`)
  )
}

export default getIsValidPermissions
