function getSplitArrayIntoTwo<T>(arr: T[]): [] | [T[], T[]] {
  if (!Array.isArray(arr)) return []
  const arrayLength = arr.length
  const halfLength = Math.ceil(arrayLength / 2)
  const firstArray = arr.slice(0, halfLength)
  const secondArray = arr.slice(halfLength)
  return [firstArray, secondArray]
}

export default getSplitArrayIntoTwo
