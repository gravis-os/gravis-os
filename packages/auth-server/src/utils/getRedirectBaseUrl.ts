const getRedirectBaseUrl = (redirectBaseUrl = 'http://localhost:3000') => {
  return redirectBaseUrl.includes('http')
    ? redirectBaseUrl
    : `https://${redirectBaseUrl}`
}

export default getRedirectBaseUrl
