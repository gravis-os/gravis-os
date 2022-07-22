import { StripePrice } from '../types'

const printStripePrice = (price: StripePrice): string | undefined => {
  return (
    price &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price?.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100)
  )
}

export default printStripePrice
