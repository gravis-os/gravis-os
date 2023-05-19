import assign from 'lodash/assign'
import entries from 'lodash/entries'
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import keys from 'lodash/keys'
import map from 'lodash/map'

export const getUploadedRows = (
  uploadedRows: unknown,
  tableHeaderRenameMapping?: Record<string, string>
): unknown => {
  // Used if tableHeaderRenameMapping is provided to change the renamed headers back from the csv.
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
