import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { Readable } from 'node:stream'
import initStripeNode from '../../stripe/initStripeNode'
import initStripeSupabaseAdmin from '../../supabase/initStripeSupabaseAdmin'

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    const StripeNode = initStripeNode(process.env.STRIPE_SECRET_KEY)
    const StripeSupabaseAdmin = initStripeSupabaseAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    try {
      if (!sig || !webhookSecret) return
      event = StripeNode.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: any) {
      console.error(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'product.created':
          case 'product.updated':
            await StripeSupabaseAdmin.upsertProductRecord(
              event.data.object as Stripe.Product
            )
            break
          case 'price.created':
          case 'price.updated':
            await StripeSupabaseAdmin.upsertPriceRecord(
              event.data.object as Stripe.Price
            )
            break
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription
            await StripeSupabaseAdmin.manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === 'customer.subscription.created'
            )
            break
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            if (checkoutSession.mode === 'subscription') {
              const subscriptionId = checkoutSession.subscription
              await StripeSupabaseAdmin.manageSubscriptionStatusChange(
                subscriptionId as string,
                checkoutSession.customer as string,
                true
              )
            }
            break
          default:
            throw new Error('Unhandled relevant event!')
        }
      } catch (error) {
        console.error(error)
        return res
          .status(400)
          .send('Webhook error: "Webhook handler failed. View logs."')
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default webhookHandler
