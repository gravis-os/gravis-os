export interface DocumentItem {
  /**
   * Format: integer
   * @description Note:
   * This is a Primary Key.<pk/>
   */
  id: number
  /**
   * Format: timestamp with time zone
   * @default CURRENT_TIMESTAMP
   */
  created_at?: string
  /**
   * Format: timestamp with time zone
   * @default CURRENT_TIMESTAMP
   */
  updated_at?: string
  /** Format: uuid */
  created_by?: string
  /** Format: uuid */
  updated_by?: string
  /** Format: text */
  status?: string
  /** Format: text */
  title: string
  /** Format: text */
  slug: string
  /** Format: text */
  subtitle?: string
  /** Format: text */
  description?: string
  /**
   * Format: integer
   * @description Note:
   * This is a Foreign Key to `project.id`.<fk table='project' column='id'/>
   */
  project_id?: number
  /**
   * Format: integer
   * @description Note:
   * This is a Foreign Key to `company.id`.<fk table='company' column='id'/>
   */
  company_id?: number
  /**
   * Format: integer
   * @description Note:
   * This is a Foreign Key to `contact.id`.<fk table='contact' column='id'/>
   */
  contact_id?: number
  /** Format: double precision */
  discount_rate?: number
  /** Format: text */
  external_notes?: string
  /** Format: text */
  internal_notes?: string
  /** Format: double precision */
  shipping?: number
  /** Format: double precision */
  subtotal?: number
  /** Format: double precision */
  tax?: number
  /** Format: double precision */
  total?: number
  /**
   * Format: integer
   * @description Note:
   * This is a Foreign Key to `order.id`.<fk table='order' column='id'/>
   */
  order_id?: number
  /** Format: text */
  payment_terms?: string
  /**
   * Format: timestamp with time zone
   * @default CURRENT_TIMESTAMP
   */
  published_at?: string
  /** Format: text */
  terms?: string
  /** Format: text */
  billing_address_city?: string
  /** Format: text */
  billing_address_country?: string
  /** Format: text */
  billing_address_line_1?: string
  /** Format: text */
  billing_address_line_2?: string
  /** Format: text */
  billing_address_postal_code?: string
  /** Format: boolean */
  is_billing_address_same_as_shipping_address?: boolean
  /** Format: text */
  shipping_address_city?: string
  /** Format: text */
  shipping_address_country?: string
  /** Format: text */
  shipping_address_line_1?: string
  /** Format: text */
  shipping_address_line_2?: string
  /** Format: text */
  shipping_address_postal_code?: string
}
