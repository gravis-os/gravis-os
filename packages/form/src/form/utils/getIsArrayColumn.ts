const getIsArrayColumn = (arr: unknown[]): boolean => {
  if (!arr?.length) return false
  // Ducktype to check if this is an array of objects or primitive values
  // If it is an array of primitive values, it is not a relational column.
  return typeof arr[0] !== 'object'
}

export default getIsArrayColumn
