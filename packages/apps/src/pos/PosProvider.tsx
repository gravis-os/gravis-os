import React, { createContext, useState } from 'react'

import { useCreateMutation } from '@gravis-os/crud'
import { CrudModule } from '@gravis-os/types'
import noop from 'lodash/noop'
import omit from 'lodash/omit'

import getDiscountedPriceFromItem from '../utils/getDiscountedPriceFromItem'
import posConfig from './posConfig'
import { Cart, CartItem, Receipt } from './types'

export const initialCart: Cart = {
  customer: null,
  items: [] as CartItem[],
  note: '',
  paid: 0,
  paymentMethod: '',
  receipt_id: null,
  subtotal: 0,
  tax: 0,
  total: 0,
}

export const initialPosContext = {
  addToCart: noop,
  cart: initialCart,
  hasCartItems: false,
  removeFromCart: noop,
  resetCart: noop,
  setCart: noop,
  setPaymentMethodAndPaidAmount: noop,
}

export type PosContext = {
  addToCart: (cartItem: CartItem) => void
  cart: Cart
  hasCartItems: boolean
  removeFromCart: (removeIndex: number) => void
  resetCart: () => void
  setCart: React.Dispatch<React.SetStateAction<Cart>>
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
    const existingItem = cart.items?.find((item) => item.id === cartItem.id)
    const nextItem = {
      ...cartItem,
      quantity: (existingItem?.quantity ?? 0) + (cartItem.quantity ?? 1),
    }
    setCart({
      ...cart,
      items: existingItem
        ? cart.items.map((item) => (item.id === cartItem.id ? nextItem : item))
        : [...cart.items, nextItem],
    })
  }
  const removeFromCart = (removeIndex: number) =>
    setCart({
      ...cart,
      items: [
        ...cart.items.slice(0, removeIndex),
        ...cart.items.slice(removeIndex + 1),
      ],
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
    const paidCart = { ...nextCart, paid, paymentMethod }
    setCart(paidCart)
    if (receiptModule) createReceipt(paidCart)
  }

  const value = {
    addToCart,
    cart: nextCart,
    hasCartItems: cart.items.length > 0,
    removeFromCart,
    resetCart,
    setCart,
    setPaymentMethodAndPaidAmount,
  }

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>
}

export const usePos = () => React.useContext(PosContext)

export default PosProvider
