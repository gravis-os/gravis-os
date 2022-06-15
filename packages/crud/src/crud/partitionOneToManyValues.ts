// TODO: Upgrade to relationship constants
const ONE_TO_MANY_KEY_SUFFIXES = [
  '_image',
  '_images',
  '_file',
  '_files',
  'lines',
]

// Find 12m relations as they need to be managed separately later
const partitionOneToManyValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => {
      const isValidKeyName = ONE_TO_MANY_KEY_SUFFIXES.some((char) =>
        key.endsWith(char)
      )
      const isArrayValue = Array.isArray(value)
      const isUndefinedValue = typeof value === 'undefined'
      const isRelationKey = isValidKeyName && (isArrayValue || isUndefinedValue)
      const nonJoinValues = !isRelationKey
        ? { ...acc[0], [key]: value }
        : acc[0]
      const joinValues = isRelationKey ? { ...acc[1], [key]: value } : acc[1]
      return [nonJoinValues, joinValues]
    },
    [{}, {}]
  )
}

export default partitionOneToManyValues
