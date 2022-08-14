const getIsValidPermissions = ({
  permissions,
  moduleTableName,
}: {
  permissions?: string[] // e.g. ['company.create', 'user.*']
  moduleTableName?: string // e.g. 'contact'
}) => {
  if (!permissions?.length || !moduleTableName) return false

  // Check if user has all permissions
  const hasWildcardPermission = permissions.some(
    (permission) => permission === '*'
  )
  if (hasWildcardPermission) return true

  // Check individual permissions by module
  return (permissions as string[]).some((permission) =>
    permission.startsWith(`${moduleTableName}.`)
  )
}

export default getIsValidPermissions
