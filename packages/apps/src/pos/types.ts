import { CrudItem } from '@gravis-os/types'

export interface CartItem extends CrudItem {
  price: number
  brand: { id: string; title: string }
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  paid: number
}
