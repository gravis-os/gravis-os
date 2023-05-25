import { CrudItem } from '@gravis-os/types'

export type Customer = {
  id: number
  full_name: string | null
  email: string | null
  mobile: string | null
  company: string | null
  shipping_address_line_1: string | null
  shipping_address_line_2: string | null
  shipping_address_postal_code: string | null
  shipping_address_city: string | null
  shipping_address_country: string | null
}

export type Salesperson = {
  id: string
  full_name: string
}
export interface CartItem extends CrudItem {
  price: number
  brand: { id: string; title: string }
  quantity: number
  discount: number
  discountType: string
  staff: Salesperson
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  paid: number
  receipt_id: number | null
  customer: Customer | null
}

export type Receipt = {
  id: number
  created_at: Date | null
  updated_at: Date | null
  created_by: string | null
  updated_by: string | null
  cart_items: JSON | null
  subtotal: number | null
  tax: number | null
  total: number | null
  payment_method: string | null
  paid: number | null
  customer: JSON | null
  src: string | null
}
