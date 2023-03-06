import { assign, entries, isArray, isNil, keys, map } from 'lodash'

export const getUploadedRowsFromTableHeaderRenameMapping = (
  uploadedRows: unknown,
  tableHeaderRenameMapping: Record<string, string>
): unknown => {
  // Used if renameTableHeaderMap is provided to changed the renamed headers back
  const reverseTableHeaderRenameMapping = !isNil(tableHeaderRenameMapping)
    ? Object.fromEntries(
        map(entries(tableHeaderRenameMapping), ([key, value]) => [value, key])
      )
    : null
  return !isNil(reverseTableHeaderRenameMapping) && isArray(uploadedRows)
    ? map(uploadedRows, (row) => {
        return assign(
          {},
          ...map(keys(row), (key) => {
            const newKey = reverseTableHeaderRenameMapping[key] || key
            return { [newKey]: row[key] }
          })
        )
      })
    : uploadedRows
}
