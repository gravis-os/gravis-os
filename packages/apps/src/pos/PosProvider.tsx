/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Cart, CartItem } from './types'
import posConfig from './posConfig'

export const initialCart = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  paymentMethod: '',
  paid: 0,
}

export const initialPosContext = {
  cart: initialCart,
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {},
  hasCartItems: false,
  setPaymentMethodAndPaidAmount: () => {},
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
}

const PosProvider: React.FC<PosProviderProps> = (props) => {
  const { children } = props

  // Cart state
  const [cart, setCart] = useState(initialCart)

  // Cart methods
  const addToCart = (cartItem: CartItem) => {
    setCart({ ...cart, items: cart.items.concat(cartItem) })
  }
  const removeFromCart = (removeIndex: number) =>
    setCart({
      ...cart,
      items: cart.items
        .slice(0, removeIndex)
        .concat(cart.items.slice(removeIndex + 1)),
    })
  const resetCart = () => setCart(initialCart)
  const setPaymentMethodAndPaidAmount = (paymentMethod: string, paid: number) =>
    setCart({ ...cart, paymentMethod, paid })

  // Cart variables
  const subtotal = cart.items.reduce((acc, { price }) => acc + price, 0)
  const nextCart = {
    ...cart,
    subtotal,
    tax: subtotal * posConfig.tax_rate,
    total: subtotal * 1.07,
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
