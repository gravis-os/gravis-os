export interface PrintNumberOptions {
  currency?: string
  dp?: number
  type?: 'amount' | string
  zeroPlaceholder?: string
}

export type PrintNumberFunction = (
  value: number,
  options?: PrintNumberOptions
) => string

const printNumber: PrintNumberFunction = (value: number, options = {}) => {
  const { currency = 'SGD', dp = 0, type = 'number', zeroPlaceholder } = options

  const isNumber =
    ['number', 'string'].includes(typeof value) && !Number.isNaN(Number(value))

  switch (true) {
    case !isNumber:
    case value === 0: {
      // Allow null to be returned
      return zeroPlaceholder === undefined ? '-' : zeroPlaceholder
    }
    case type === 'percentage': {
      return `${(value * 100).toFixed(dp)}%`
    }
    case type === 'amount': {
      // @link developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
      // If maximumFractionDigits is 2 and roundingIncrement is 5, then the number is rounded to the nearest 0.05 ("nickel rounding").
      return new Intl.NumberFormat('en-SG', {
        currency,
        maximumFractionDigits: dp,
        style: 'currency',
      }).format(value)
    }
    case type === 'number': {
      return value.toLocaleString()
    }
    default: {
      return String(value)
    }
  }
}

export default printNumber
