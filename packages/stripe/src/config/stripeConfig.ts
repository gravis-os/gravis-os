import { getStripeRedirectBaseUrl } from '../utils'

const stripeRedirectBaseUrl = getStripeRedirectBaseUrl(process.env.VERCEL_URL)

const stripeConfig = {
  title: 'Stripe',
  apiRoutes: {
    createCheckoutSession: '/api/stripe/create-checkout-session',
    createPortalLink: '/api/stripe/create-portal-link',
    webhooks: '/api/stripe/webhooks',
  },
  cancelUrl: `${stripeRedirectBaseUrl}`,
  returnUrl: `${stripeRedirectBaseUrl}/account`,
  successUrl: `${stripeRedirectBaseUrl}/account`,
}

export default stripeConfig
