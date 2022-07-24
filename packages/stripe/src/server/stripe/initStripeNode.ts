import Stripe from 'stripe'
import stripeConfig from '../../config/stripeConfig'

const initStripeNode = (stripeSecretKey = '') => {
  const stripeNode = new Stripe(stripeSecretKey, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: stripeConfig.title,
      version: '0.0.1',
    },
  })
  return stripeNode
}

export default initStripeNode
