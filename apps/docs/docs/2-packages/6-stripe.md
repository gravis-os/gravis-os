# @gravis-os/stripe

## Getting started

1. `yarn add @gravis-os/stripe`
2. In `.env`, add:

```tsx
# Stripe - Update these with your Stripe credentials from https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXX
STRIPE_SECRET_KEY=sk_test_XXX
STRIPE_WEBHOOK_SECRET=whsec_XXX
```

3. In `pages/api/stripe/[...stripe].ts`, do:

```tsx
import { StripeRouterMiddleware } from '@gravis-os/stripe/server'

export default StripeRouterMiddleware()
```

4. In `pages/pricing.tsx`, do:

```tsx
import { StripeSupabaseClient, StripeProductWithPrice } from '@gravis-os/stripe'

export interface PricingPageProps {
  stripeProducts?: StripeProductWithPrice[]
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PricingPageProps>
> {
  const stripeProducts =
    await StripeSupabaseClient.fetchActiveProductsWithPrices()

  return {
    props: { stripeProducts },
    revalidate: 60,
  }
}

const PricingPage const PricingPage: React.FC<PricingPageProps> = (props) => {
  const { stripeProducts } = props
	
	return (/* Your UI */)
}
```
