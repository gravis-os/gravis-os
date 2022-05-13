// Find m2m relations as they need to be managed separately later
const partitionJoinValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => {
      const isJoinKey = key.endsWith('_ids')
      const nonJoinValues = !isJoinKey ? { ...acc[0], [key]: value } : acc[0]
      const joinValues = isJoinKey ? { ...acc[1], [key]: value } : acc[1]
      return [nonJoinValues, joinValues]
    },
    [{}, {}]
  )
}

export default partitionJoinValues
