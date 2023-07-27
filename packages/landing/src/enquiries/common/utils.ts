export const getDomainAndPathTagsFromUrl = (url: string) => {
  const urlObject = new URL(url)

  const domain = urlObject.hostname
  const path = urlObject.pathname

  // mailchimp does not allow tags of length greater than 100
  return {
    domain: domain.length > 100 ? domain.slice(0, 99) : domain,
    path,
  }
}
