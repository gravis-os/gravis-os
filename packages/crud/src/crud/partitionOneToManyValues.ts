import { ONE_TO_MANY_KEY_SUFFIXES } from '../constants'

// Find 12m relations as they need to be managed separately later
const partitionOneToManyValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => {
      const isValidKeyName = ONE_TO_MANY_KEY_SUFFIXES.some((char) =>
        key.endsWith(char)
      )
      const isArrayValue = Array.isArray(value)
      const isUndefinedValue = typeof value === 'undefined'

      // All array values are treated as one-to-many-relations and will be partitioned out.
      const isOneToManyKey =
        isArrayValue || (isValidKeyName && isUndefinedValue)

      const nonJoinValues = !isOneToManyKey
        ? { ...acc[0], [key]: value }
        : acc[0]

      const joinValues = isOneToManyKey ? { ...acc[1], [key]: value } : acc[1]

      return [nonJoinValues, joinValues]
    },
    [{}, {}]
  )
}

export default partitionOneToManyValues
