import printNumber from './printNumber'

const printAmount = (value, options = {}) =>
  printNumber(value, { dp: 2, type: 'amount', ...options })

export default printAmount
