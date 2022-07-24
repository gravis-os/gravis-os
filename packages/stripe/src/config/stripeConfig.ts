import { getStripeRedirectBaseUrl } from '../utils'

const stripeRedirectBaseUrl = getStripeRedirectBaseUrl(process.env.VERCEL_URL)

const stripeConfig = {
  title: 'Stripe',
  successUrl: `${stripeRedirectBaseUrl}/account`,
  returnUrl: `${stripeRedirectBaseUrl}/account`,
  cancelUrl: `${stripeRedirectBaseUrl}`,
  apiRoutes: {
    createCheckoutSession: '/api/stripe/create-checkout-session',
    createPortalLink: '/api/stripe/create-portal-link',
    webhooks: '/api/stripe/webhooks',
  },
}

export default stripeConfig
