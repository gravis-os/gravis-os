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
      return price
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

export default getDiscountedPriceFromItem
