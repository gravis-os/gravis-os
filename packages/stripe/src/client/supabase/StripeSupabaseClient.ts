import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { StripeProductWithPrice } from '../../types'

const supabase = createClientComponentClient()

const fetchActiveProductsWithPrices = async (): Promise<
  StripeProductWithPrice[]
> => {
  const { data, error } = await supabase
    .from('stripe_product')
    .select('*, stripe_price(*)')
    .eq('active', true)
    .eq('stripe_price.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'stripe_price' })

  if (error) {
    console.error(error.message)
    throw error
  }

  return data || []
}

export default {
  fetchActiveProductsWithPrices,
}
