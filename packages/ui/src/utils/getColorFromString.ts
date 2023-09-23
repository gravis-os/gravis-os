/* eslint-disable fp/no-let, fp/no-mutation, fp/no-loops, unicorn/number-literal-case, unicorn/prefer-code-point */

// Adapted from mui
// @link https://mui.com/material-ui/react-avatar/#letter-avatars
const getColorFromString = (string: string): string => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export default getColorFromString
