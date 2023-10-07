import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

import { StripePrice, StripeProduct } from '../../types'
import toDateTime from '../../utils/toDateTime'
import initStripeNode from '../stripe/initStripeNode'

/**
 * initStripeSupabaseAdmin()
 * Factory Function
 * const stripeSupabaseAdmin = initStripeSupabaseAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
 */
const initStripeSupabaseAdmin = (
  supabaseUrl = '',
  supabaseServiceRoleKey = ''
) => {
  // ==============================
  // Initializer
  // ==============================
  const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
  // Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
  // as it has admin privileges and overwrites RLS policies!
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

  // ==============================
  // Methods
  // ==============================
  const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: StripeProduct = {
      id: product.id,
      active: product.active,
      description: product.description ?? undefined,
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
      name: product.name,
    }
    const { error } = await supabaseAdmin
      .from('stripe_product')
      .upsert([productData])
      .select()
    if (error) throw error
  }
  const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: StripePrice = {
      id: price.id,
      active: price.active,
      currency: price.currency,
      description: price.nickname ?? undefined,
      interval: price.recurring?.interval,
      interval_count: price.recurring?.interval_count,
      metadata: price.metadata,
      product_id: typeof price.product === 'string' ? price.product : '',
      trial_period_days: price.recurring?.trial_period_days,
      type: price.type,
      unit_amount: price.unit_amount ?? undefined,
    }

    const { error } = await supabaseAdmin
      .from('stripe_price')
      .upsert([priceData])
      .select()
    if (error) throw error
  }
  const createOrRetrieveCustomer = async ({
    email,
    uuid,
  }: {
    email: string
    uuid: string
  }) => {
    const { data, error } = await supabaseAdmin
      .from('user')
      .select('id, stripe_customer_id')
      .eq('id', uuid)
      .single()

    if (!error && data && !data.stripe_customer_id) {
      // No customer record found, let's create one.
      const customerData: {
        email?: string
        metadata: { supabaseUUID: string }
      } = {
        metadata: {
          supabaseUUID: uuid,
        },
        ...(email && { email }),
      }

      const customer = await StripeNode.customers.create(customerData)

      // Now insert the customer ID into our Supabase mapping table.
      const { error: supabaseError } = await supabaseAdmin
        .from('user')
        .update({ stripe_customer_id: customer.id })
        .match({ id: uuid })
        .select()

      if (supabaseError) throw supabaseError

      return customer.id
    }
    if (data) return data.stripe_customer_id
  }
  /**
   * Copies the billing details from the payment method to the customer object.
   */
  const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
  ) => {
    // TODO: check this assertion
    const customer = payment_method.customer as string
    const { address, name, phone } = payment_method.billing_details

    if (!name || !phone || !address) return

    await StripeNode.customers.update(customer, {
      // @ts-ignore
      address,
      name,
      phone,
    })
    const { error } = await supabaseAdmin
      .from('user')
      .update({
        billing_address: address,
        payment_method: payment_method[payment_method.type],
      })
      .eq('id', uuid)
      .select()
    if (error) throw error
  }
  const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
  ) => {
    // Get customer's UUID from mapping table.
    const { data: customerData, error: noCustomerError } = await supabaseAdmin
      .from('user')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single()
    if (noCustomerError) throw noCustomerError

    const { id: uuid } = customerData || {}

    const subscription = await StripeNode.subscriptions.retrieve(
      subscriptionId,
      {
        expand: ['default_payment_method'],
      }
    )
    // Upsert the latest status of the subscription object.
    const subscriptionData = {
      id: subscription.id,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at)
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at)
        : null,
      created: toDateTime(subscription.created),
      // TODO check quantity on subscription
      current_period_end: toDateTime(subscription.current_period_end),
      current_period_start: toDateTime(subscription.current_period_start),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at)
        : null,
      metadata: subscription.metadata,
      price_id: subscription.items.data[0].price.id,
      // @ts-ignore
      quantity: subscription.quantity,
      status: subscription.status,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end)
        : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start)
        : null,
      user_id: uuid,
    }

    const { error } = await supabaseAdmin
      .from('stripe_subscription')
      .upsert([subscriptionData])
      .select()
    if (error) throw error

    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (createAction && subscription.default_payment_method && uuid)
      // @ts-ignore
      await copyBillingDetailsToCustomer(
        uuid,
        subscription.default_payment_method as Stripe.PaymentMethod
      )
  }

  // ==============================
  // Return
  // ==============================
  return {
    createOrRetrieveCustomer,
    manageSubscriptionStatusChange,
    upsertPriceRecord,
    upsertProductRecord,
  }
}

export default initStripeSupabaseAdmin
