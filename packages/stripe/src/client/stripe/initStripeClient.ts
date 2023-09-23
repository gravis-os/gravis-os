/* eslint-disable fp/no-let, fp/no-mutation */

import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const initStripeClient = (stripePublicKey = '') => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey)
  }

  return stripePromise
}

export default initStripeClient
