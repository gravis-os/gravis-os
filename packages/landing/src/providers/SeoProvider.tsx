import React from 'react'
import { DefaultSeo } from 'next-seo'
import { useLayout } from './LayoutProvider'

export interface SeoProviderProps {
  children?: React.ReactNode
}

const SeoProvider: React.FC<SeoProviderProps> = (props) => {
  const { children } = props
  const { site } = useLayout()

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_SG',
          url: site.absolute_url,
          siteName: site.title,
          images: [
            {
              url: `${site?.absolute_url || ''}/images/meta_image.png`,
            },
          ],
        }}
        {...(site.social_media_twitter_url && {
          twitter: {
            handle: `@${site.social_media_twitter_url.split('/').pop()}`,
            site: `@${site.social_media_twitter_url.split('/').pop()}`,
            cardType: 'summary_large_image',
          },
        })}
      />

      {/* Children */}
      {children}
    </>
  )
}

export default SeoProvider
