const getMathMode = (arr: unknown[]): unknown | undefined => {
  if (!Array.isArray(arr)) return

  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop()
}

export default getMathMode
