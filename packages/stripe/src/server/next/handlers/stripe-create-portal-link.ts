import { getUser, withApiAuth } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { initStripeNode, initStripeSupabaseAdmin } from '../../index'

const handleCreateStripePortalLink = async (
  req: NextApiRequest,
  res: NextApiResponse,
  stripeConfig
) => {
  if (req.method === 'POST') {
    try {
      const { user } = await getUser({ req, res })
      if (!user) throw Error('Could not get user')

      const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
      const StripeSupabaseAdmin = initStripeSupabaseAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const customer = await StripeSupabaseAdmin.createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || '',
      })

      if (!customer) throw Error('Could not get customer')

      const { url } = await StripeNode.billingPortal.sessions.create({
        customer,
        return_url: stripeConfig.returnUrl,
      })

      return res.status(200).json({ url })
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
    handleCreateStripePortalLink(req, res, stripeConfig)
  )(req, res)
}
