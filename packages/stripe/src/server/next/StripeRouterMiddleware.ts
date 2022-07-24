import type { NextApiRequest, NextApiResponse } from 'next'
import defaultStripeConfig from '../../config/stripeConfig'
import handleStripeCreateCheckoutSession from './handlers/stripe-create-checkout-session'
import handleStripeCreatePortalLink from './handlers/stripe-create-portal-link'
import handleStripeWebhooks from './handlers/stripe-webhooks'

const stripeRoutesToHandlers = {
  [defaultStripeConfig.apiRoutes.createCheckoutSession]:
    handleStripeCreateCheckoutSession,
  [defaultStripeConfig.apiRoutes.createPortalLink]:
    handleStripeCreatePortalLink,
  [defaultStripeConfig.apiRoutes.webhooks]: handleStripeWebhooks,
}

export interface StripeRouterMiddlewareProps {}

/**
 * StripeRouterMiddleware
 *
 * @usage:
 * // In `pages/api/stripe/[...stripe].ts`
 * import { StripeRouterMiddleware } from '@gravis-os/stripe/server'
 * export default StripeRouterMiddleware()
 * @param injectedConfig
 * @constructor
 */
const StripeRouterMiddleware = (
  injectedConfig: StripeRouterMiddlewareProps = {}
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const {
      query: { stripe: injectedRoute },
    } = req

    // @example `create-checkout-session`
    const route = Array.isArray(injectedRoute)
      ? injectedRoute[0]
      : injectedRoute

    // Options
    const stripeConfig = {
      ...defaultStripeConfig,
      ...injectedConfig, // User options from downstream
    }

    // Happy path
    const handler = stripeRoutesToHandlers[`/api/stripe/${route}`]
    if (handler) return handler(req, res, stripeConfig)

    // Fallback to 404
    res.status(404).end()
  }
}

export default StripeRouterMiddleware
