/**
 * Polyfill isMatch from micromatch to support edge runtime.
 * This polyfill is generated from GPT and uses regex instead of micromatch.
 * Note that this is a simple matcher and cannot be compared to micromatch
 * which will be able to test for more advanced cases.
 *
 * However, for our use case, this is sufficient.
 * @param path {string}
 * @param patterns {array}
 */
const isPathMatch = (path: string, patterns: string[]) => {
  if (!path) return false

  return patterns.some((pattern) => {
    if (pattern.endsWith('*')) {
      const patternWithoutStar = pattern.slice(0, -1)

      // Remove trailing slash if it exists
      const pathWithoutTrailingSlash = path.endsWith('/')
        ? path.slice(0, -1)
        : path
      const patternWithoutTrailingSlash = patternWithoutStar.endsWith('/')
        ? patternWithoutStar.slice(0, -1)
        : patternWithoutStar

      // Check if the path is exactly the pattern without '*' or starts with the pattern
      return (
        pathWithoutTrailingSlash === patternWithoutTrailingSlash ||
        path.startsWith(`${patternWithoutStar}`)
      )
    }
    return path === pattern
  })
}

export default isPathMatch
