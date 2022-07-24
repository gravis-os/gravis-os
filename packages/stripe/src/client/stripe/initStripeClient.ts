import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const initStripeClient = (stripePublicKey = '') => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey)
  }

  return stripePromise
}

export default initStripeClient
