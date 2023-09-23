import Stripe from 'stripe'

export interface PageMeta {
  cardImage: string
  description: string
  title: string
}

export interface Customer {
  id: string /* primary key */
  stripe_customer_id?: string
}

export interface StripeProduct {
  active?: boolean
  description?: string
  id: string /* primary key */
  image?: string
  metadata?: Stripe.Metadata
  name?: string
  unit_amount?: number
}

export interface UserDetails {
  avatar_url?: string
  billing_address?: Stripe.Address
  first_name: string
  full_name?: string
  id: string /* primary key */
  last_name: string
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface StripePrice {
  active?: boolean
  currency?: string
  description?: string
  id: string /* primary key */
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  metadata?: Stripe.Metadata
  product_id?: string /* foreign key to products.id */
  products?: StripeProduct
  trial_period_days?: null | number
  type?: string
  unit_amount?: number
}

export interface PriceWithStripeProduct extends StripePrice {}

export interface StripeSubscription {
  cancel_at?: string
  cancel_at_period_end?: boolean
  canceled_at?: string
  created: string
  current_period_end: string
  current_period_start: string
  ended_at?: string
  id: string /* primary key */
  metadata?: Stripe.Metadata
  price_id?: string /* foreign key to prices.id */
  prices?: StripePrice
  quantity?: number
  status?: Stripe.Subscription.Status
  trial_end?: string
  trial_start?: string
  user_id: string
}

export interface StripeProductWithPrice extends StripeProduct {
  stripe_price?: StripePrice[]
}
