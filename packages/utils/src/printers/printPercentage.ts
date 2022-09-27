import printNumber from './printNumber'

const printPercentage = (value, options = {}) =>
  printNumber(value, { type: 'percentage', ...options })

export default printPercentage
