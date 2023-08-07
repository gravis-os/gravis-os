export default function getArrayWithSortOrder<T>(
  array: T[],
  sortOrder: T[]
): T[] {
  const nextArray = [...array]
  nextArray.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
  return nextArray
}
