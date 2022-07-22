const getStripeRedirectBaseUrl = (
  stripeRedirectBaseUrl = 'http://localhost:3000'
) => {
  return stripeRedirectBaseUrl.includes('http')
    ? stripeRedirectBaseUrl
    : `https://${stripeRedirectBaseUrl}`
}

export default getStripeRedirectBaseUrl
