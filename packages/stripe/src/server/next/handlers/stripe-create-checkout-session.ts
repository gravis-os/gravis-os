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
    const { id: priceId, quantity = 1, metadata = {} } = req.body

    try {
      const { user } = await getUser({ req, res })
      if (!user) throw Error('Could not get user')

      const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
      const StripeSupabaseAdmin = initStripeSupabaseAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const customer = await StripeSupabaseAdmin.createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || '',
      })

      const session = await StripeNode.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer,
        line_items: [{ price: priceId, quantity }],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata,
        },
        success_url: stripeConfig.successUrl,
        cancel_url: stripeConfig.cancelUrl,
      })

      return res.status(200).json({ sessionId: session.id })
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
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
