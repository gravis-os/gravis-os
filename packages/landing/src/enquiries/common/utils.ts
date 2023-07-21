import { makeMail } from '@gravis-os/mail'
import { commonConfig } from './config'

export const getDomainAndPathTagsFromUrl = (url: string) => {
  const urlObject = new URL(url)

  const domainPrefix = 'Domain: '
  const pathPrefix = 'Path: '

  const domain = domainPrefix + urlObject.hostname
  const path = pathPrefix + urlObject.pathname
  // mailchimp does not allow tags of length greater than 100
  return {
    domain: domain.length > 100 ? domain.slice(0, 99) : domain,
    path,
  }
}

export const Mail = makeMail({
  from: commonConfig.fromEmail,
  mailgenConfig: {
    name: '',
    link: commonConfig.absoluteUrl || '',
    logo: `${commonConfig.absoluteUrl}/static/logo.jpg`,
    logoHeight: 48,
  },
})
