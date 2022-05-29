import printNumber from './printNumber'

const printAmount = (value, options = {}) =>
  printNumber(value, { dp: 2, ...options })

export default printAmount
