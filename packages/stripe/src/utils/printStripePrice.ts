import { StripePrice } from '../types'

const printStripePrice = (price: StripePrice): string | undefined => {
  return (
    price &&
    new Intl.NumberFormat('en-US', {
      currency: price?.currency,
      minimumFractionDigits: 0,
      style: 'currency',
    }).format((price?.unit_amount || 0) / 100)
  )
}

export default printStripePrice
