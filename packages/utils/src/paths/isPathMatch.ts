import { isMatch } from 'micromatch'

const isPathMatch = (str, patterns, options = {}) =>
  isMatch(str, patterns, {
    /**
     * Treats single stars as globstars (**)
     * @link https://github.com/micromatch/micromatch#options
     */
    bash: true,
    ...options,
  })

export default isPathMatch
