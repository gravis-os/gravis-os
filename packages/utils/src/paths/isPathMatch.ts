import { isMatch } from 'micromatch'

const isPathMatch = (
  str: string,
  patterns: string | string[],
  options = {}
) => {
  if (!str) return false

  // Append '/' to str to ensure we match '/blog' against ['/blog/*']
  const nextStr = str.endsWith('/') ? str : `${str}/`

  return isMatch(nextStr, patterns, {
    /**
     * Treats single stars as globstars (**)
     * @link https://github.com/micromatch/micromatch#options
     */
    bash: true,
    ...options,
  })
}

export default isPathMatch
