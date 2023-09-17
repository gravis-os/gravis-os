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
      // Remove the '*' and check if the path starts with the pattern
      return path.startsWith(pattern.slice(0, -1))
    }
    return path === pattern
  })
}

export default isPathMatch
