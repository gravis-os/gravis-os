import React, { createContext, useState } from 'react'
import { useCreateMutation } from '@gravis-os/crud'
import { CrudModule } from '@gravis-os/types'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import getDiscountedPriceFromItem from '../utils/getDiscountedPriceFromItem'
import posConfig from './posConfig'
import { Cart, CartItem, Receipt } from './types'

export const initialCart: Cart = {
  items: [] as CartItem[],
  subtotal: 0,
  tax: 0,
  total: 0,
  paymentMethod: '',
  paid: 0,
  receipt_id: null,
  customer: null,
  note: '',
}

export const initialPosContext = {
  cart: initialCart,
  setCart: noop,
  addToCart: noop,
  removeFromCart: noop,
  resetCart: noop,
  hasCartItems: false,
  setPaymentMethodAndPaidAmount: noop,
}

export type PosContext = {
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  addToCart: (cartItem: CartItem) => void
  removeFromCart: (removeIndex: number) => void
  resetCart: () => void
  hasCartItems: boolean
  setPaymentMethodAndPaidAmount: (
    paymentMethod: string,
    paidAmount: number
  ) => void
}

export const PosContext = createContext<PosContext>(initialPosContext)

export interface PosProviderProps {
  children?: React.ReactNode
  receiptModule?: CrudModule
}

const PosProvider: React.FC<PosProviderProps> = (props) => {
  const { children, receiptModule } = props || {}

  // Cart state
  const [cart, setCart] = useState(initialCart)

  // Cart methods
  const addToCart = (cartItem: CartItem) => {
    setCart({ ...cart, items: cart.items.concat({ ...cartItem, quantity: cartItem?.quantity ?? 1}) })
  }
  const removeFromCart = (removeIndex: number) =>
    setCart({
      ...cart,
      items: cart.items
        .slice(0, removeIndex)
        .concat(cart.items.slice(removeIndex + 1)),
    })
  const resetCart = () => setCart(initialCart)

  // Cart variables
  const subtotal = cart.items.reduce(
    (acc, item) => acc + getDiscountedPriceFromItem(item),
    0
  )
  const nextCart = {
    ...cart,
    subtotal,
    tax: subtotal * posConfig.tax_rate,
    total: subtotal * (posConfig.tax_rate + 1),
  }

  // Create Receipt
  const { createMutation: createReceiptMutation } = useCreateMutation<Receipt>({
    module: receiptModule,
  })

  const createReceipt = async (cart: Cart) => {
    const { data, error } = await createReceiptMutation.mutateAsync({
      ...omit(cart, ['items', 'paymentMethod', 'receipt_id', 'note']),
      cart_items: cart.items,
      payment_method: cart.paymentMethod,
    })
    if (error) console.error(error)
    const [receipt] = data as Receipt[]
    setCart({ ...cart, receipt_id: receipt?.id })
  }

  // Create Receipt on Payment
  const setPaymentMethodAndPaidAmount = (
    paymentMethod: string,
    paid: number
  ) => {
    const paidCart = { ...nextCart, paymentMethod, paid }
    setCart(paidCart)
    if (receiptModule) createReceipt(paidCart)
  }

  const value = {
    cart: nextCart,
    setCart,
    addToCart,
    removeFromCart,
    resetCart,
    hasCartItems: cart.items.length > 0,
    setPaymentMethodAndPaidAmount,
  }

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>
}

export const usePos = () => React.useContext(PosContext)

export default PosProvider
