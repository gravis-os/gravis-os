import { getUser, withApiAuth } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

import initStripeNode from '../../stripe/initStripeNode'
import initStripeSupabaseAdmin from '../../supabase/initStripeSupabaseAdmin'

const handleCreateStripeCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
  stripeConfig
) => {
  if (req.method === 'POST') {
    // StripePrice
    const { id: priceId, metadata = {}, quantity = 1 } = req.body

    try {
      const { user } = await getUser({ req, res })
      if (!user) throw new Error('Could not get user')

      const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
      const StripeSupabaseAdmin = initStripeSupabaseAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const customer = await StripeSupabaseAdmin.createOrRetrieveCustomer({
        email: user?.email || '',
        uuid: user?.id || '',
      })

      const session = await StripeNode.checkout.sessions.create({
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        cancel_url: stripeConfig.cancelUrl,
        customer,
        line_items: [{ price: priceId, quantity }],
        mode: 'subscription',
        payment_method_types: ['card'],
        subscription_data: {
          metadata,
          trial_from_plan: true,
        },
        success_url: stripeConfig.successUrl,
      })

      return res.status(200).json({ sessionId: session.id })
    } catch (error: any) {
      console.error(error)
      res
        .status(500)
        .json({ error: { message: error.message, statusCode: 500 } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default async (req, res, stripeConfig) => {
  return withApiAuth(async (req, res) =>
    handleCreateStripeCheckoutSession(req, res, stripeConfig)
  )(req, res)
}
