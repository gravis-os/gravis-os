import { CrudItem } from '@gravis-os/types'

export interface AttributeOption {
  id: number
  title: string
}

export interface Attribute {
  id: number
  title: string
  options: AttributeOption[]
}

export interface AttributeValue {
  id: number
  attribute: Attribute
  attribute_option: AttributeOption
}

export interface Variant extends CrudItem {
  price?: number
}

export interface Brand extends CrudItem {
  description?: string
  code?: string
  company_id?: number
  is_active?: boolean
  created_by?: number | string
  updated_by?: number | string
  sales_email?: string
  sales_mobile?: string
  sales_whatsapp?: string
}

export interface Listing extends CrudItem {
  id: number
  attribute_value?: AttributeValue[]
  avatar_src?: string
  avatar_alt?: string
  title: string
  subtitle?: string
  lat?: number
  lng?: number
  // Relations
  brand: any
  directory_category: {
    directory: any
  }
  default_variant?: Variant
  default_variant_id?: number
  variants?: Variant[]
  // Virtuals
  price?: number
  priceText?: string
}
