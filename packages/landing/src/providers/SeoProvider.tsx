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
          images: [
            {
              url: `${site?.absolute_url || ''}/images/meta_image.png`,
            },
          ],
          locale: 'en_SG',
          siteName: site?.title,
          type: 'website',
          url: site?.absolute_url,
        }}
        {...(site?.social_media_twitter_url && {
          twitter: {
            cardType: 'summary_large_image',
            handle: `@${site?.social_media_twitter_url.split('/').at(-1)}`,
            site: `@${site?.social_media_twitter_url.split('/').at(-1)}`,
          },
        })}
      />

      {/* Children */}
      {children}
    </>
  )
}

export default SeoProvider
