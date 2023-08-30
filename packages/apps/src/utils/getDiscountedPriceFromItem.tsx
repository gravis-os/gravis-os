import { CartItem } from '../pos/types'

const getDiscountedPriceFromItem = (item: CartItem) => {
  const { price, discount, discountType, quantity } = item || {}
  switch (discountType) {
    case 'amount':
      return (price - discount) * (quantity || 1)
    case 'percentage':
      return price * (1 - discount / 100) * (quantity || 1)
    case 'override':
      return Number(discount) * (quantity || 1)
    default:
      return price * (quantity || 1)
  }
}

export const getDiscountedPrice = (
  price: number,
  discount: number,
  discountType: string
) => {
  switch (discountType) {
    case 'amount':
      return price - discount
    case 'percentage':
      return price * (1 - discount / 100)
    case 'override':
      return Number(discount)
    default:
      return price
  }
}

export const getDiscountAmount = (item: CartItem) => {
  const { discount, discountType, quantity } = item || {}
  switch (discountType) {
    case 'amount':
      return `- $${discount * (quantity || 1)}`
    case 'percentage':
      return `- ${discount}%`
    case 'override':
      return 'Special price'
    default:
      return ''
  }
}

export default getDiscountedPriceFromItem
