const getStripeRedirectBaseUrl = () => {
  const url =
    // eslint-disable-next-line no-nested-ternary
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000'
  return url.includes('http') ? url : `https://${url}`
}

export default getStripeRedirectBaseUrl
