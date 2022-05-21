// Find m2m relations as they need to be managed separately later
const partitionManyToManyValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => {
      const isRelationKey = key.endsWith('_ids')
      const nonJoinValues = !isRelationKey
        ? { ...acc[0], [key]: value }
        : acc[0]
      const joinValues = isRelationKey ? { ...acc[1], [key]: value } : acc[1]
      return [nonJoinValues, joinValues]
    },
    [{}, {}]
  )
}

export default partitionManyToManyValues
