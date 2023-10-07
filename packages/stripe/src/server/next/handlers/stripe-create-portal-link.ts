import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'

import initStripeNode from '../../stripe/initStripeNode'
import initStripeSupabaseAdmin from '../../supabase/initStripeSupabaseAdmin'

const handleCreateStripePortalLink = async (
  req: NextApiRequest,
  res: NextApiResponse,
  stripeConfig
) => {
  if (req.method === 'POST') {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Could not get user')

      const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
      const StripeSupabaseAdmin = initStripeSupabaseAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

      const customer = await StripeSupabaseAdmin.createOrRetrieveCustomer({
        email: user.email || '',
        uuid: user.id || '',
      })

      if (!customer) throw new Error('Could not get customer')

      const { url } = await StripeNode.billingPortal.sessions.create({
        customer,
        return_url: stripeConfig.returnUrl,
      })

      return res.status(200).json({ url })
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
  return (req, res) => handleCreateStripePortalLink(req, res, stripeConfig)
}
