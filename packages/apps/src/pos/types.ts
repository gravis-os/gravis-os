import { CrudItem } from '@gravis-os/types'

export type Customer = {
  company: null | string
  email: null | string
  full_name: null | string
  id: number
  mobile: null | string
  shipping_address_city: null | string
  shipping_address_country: null | string
  shipping_address_line_1: null | string
  shipping_address_line_2: null | string
  shipping_address_postal_code: null | string
}

export type Salesperson = {
  full_name: string
  id: string
}
export interface CartItem extends CrudItem {
  brand: { id: string; title: string }
  discount: number
  discountType: string
  model_code: string
  price: number
  quantity: number
  staff: Salesperson
}

export interface Cart {
  customer: Customer | null
  items: CartItem[]
  note: null | string
  paid: number
  paymentMethod: string
  receipt_id: null | number
  subtotal: number
  tax: number
  total: number
}

export type Receipt = {
  cart_items: JSON | null
  created_at: Date | null
  created_by: null | string
  customer: JSON | null
  id: number
  paid: null | number
  payment_method: null | string
  src: null | string
  subtotal: null | number
  tax: null | number
  total: null | number
  updated_at: Date | null
  updated_by: null | string
}
