const getMathMode = (arr: unknown[]): undefined | unknown => {
  if (!Array.isArray(arr)) return

  // eslint-disable-next-line fp/no-mutating-methods
  return [...arr]
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .at(-1)
}

export default getMathMode
