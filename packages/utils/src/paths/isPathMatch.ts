/**
 * Polyfill isMatch from micromatch to support edge runtime.
 * This polyfill is generated from GPT and uses regex instead of micromatch.
 * Note that this is a simple matcher and cannot be compared to micromatch
 * which will be able to test for more advanced cases.
 *
 * However, for our use case, this is sufficient.
 * @param pattern
 */
const globToRegex = (pattern: string): RegExp => {
  let reStr = pattern
    // Treat single * as **
    .replace(/\*/g, '.*')
    // Escape characters that have special meanings in regex
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')

  reStr = `^${reStr}$`
  return new RegExp(reStr)
}

const isMatch = (str: string, pattern: string | string[]): boolean => {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => globToRegex(p).test(str))
  }
  return globToRegex(pattern).test(str)
}

const isPathMatch = (str: string, patterns: string | string[]) => {
  if (!str) return false

  // Append '/' to str to ensure we match '/blog' against ['/blog/*']
  const nextStr = str.endsWith('/') ? str : `${str}/`

  return isMatch(nextStr, patterns)
}

export default isPathMatch
