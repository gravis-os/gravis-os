const getGuestPaths = (arr: string[]): [] | string[] => {
  if (!Array.isArray(arr)) return []

  // Prepend default guest paths
  return ['/', '/auth/*', ...arr]
}

export default getGuestPaths
