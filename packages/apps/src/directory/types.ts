import { CrudItem } from '@gravis-os/types'

export interface AttributeOption {
  id: number
  title: string
}

export interface Attribute {
  id: number
  options: AttributeOption[]
  title: string
}

export interface AttributeValue {
  attribute: Attribute
  attribute_option: AttributeOption
  id: number
}

export interface Variant extends CrudItem {
  price?: number
}

export interface Brand extends CrudItem {
  code?: string
  company_id?: number
  created_by?: number | string
  description?: string
  is_active?: boolean
  sales_email?: string
  sales_mobile?: string
  sales_whatsapp?: string
  updated_by?: number | string
}

export interface Listing extends CrudItem {
  attribute_value?: AttributeValue[]
  avatar_alt?: string
  avatar_src?: string
  // Relations
  brand: any
  default_variant?: Variant
  default_variant_id?: number
  directory_category: {
    directory: any
  }
  id: number
  lat?: number
  lng?: number
  // Virtuals
  price?: number
  priceText?: string
  subtitle?: string
  title: string
  variants?: Variant[]
}
