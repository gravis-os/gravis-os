import { getIsArrayColumn } from '@gravis-os/form'

import { ONE_TO_MANY_KEY_SUFFIXES } from '../constants'

// Find 12m relations as they need to be managed separately later
const partitionOneToManyValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => {
      const isValidKeyName = ONE_TO_MANY_KEY_SUFFIXES.some((char) =>
        key.endsWith(char)
      )
      const isArrayValue = Array.isArray(value)
      const isUndefinedValue = value === undefined

      // Exclude certain array columns from being treated as 1:m.
      // This is to allow for array columns to be used as normal columns.
      const isArrayColumn = getIsArrayColumn(value as unknown[])

      const isOneToManyKey =
        !isArrayColumn && (isArrayValue || (isValidKeyName && isUndefinedValue))

      const nonJoinValues = isOneToManyKey
        ? acc[0]
        : { ...acc[0], [key]: value }

      const joinValues = isOneToManyKey ? { ...acc[1], [key]: value } : acc[1]

      return [nonJoinValues, joinValues]
    },
    [{}, {}]
  )
}

export default partitionOneToManyValues
