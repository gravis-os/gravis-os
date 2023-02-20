export interface PrintNumberOptions {
  type?: string | 'amount'
  zeroPlaceholder?: string
  dp?: number
  currency?: string
}

export type PrintNumberFunction = (
  value: number,
  options?: PrintNumberOptions
) => string

const printNumber: PrintNumberFunction = (value: number, options = {}) => {
  const { currency = 'SGD', type = 'number', zeroPlaceholder, dp = 0 } = options

  const isNumber =
    ['number', 'string'].includes(typeof value) && !Number.isNaN(Number(value))

  switch (true) {
    case !isNumber:
    case value === 0:
      // Allow null to be returned
      return typeof zeroPlaceholder === 'undefined' ? '-' : zeroPlaceholder
    case type === 'percentage':
      return `${(value * 100).toFixed(dp)}%`
    case type === 'amount':
      // @link developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
      // If maximumFractionDigits is 2 and roundingIncrement is 5, then the number is rounded to the nearest 0.05 ("nickel rounding").
      return new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency,
        maximumFractionDigits: dp,
      }).format(value)
    case type === 'number':
      return value.toLocaleString()
    default:
      return String(value)
  }
}

export default printNumber
