import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const addGtmDataLayer = (data = {}) => {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line
  (window as any).dataLayer = (window as any).dataLayer || [] as any
  // eslint-disable-next-line
  (window as any).dataLayer.push(data)
}

export const setPageview = (url, options = {}) => {
  if (!GTM_ID) return null
  return addGtmDataLayer({
    event: 'pageview',
    page: url,
    ...options,
  })
}

export const useGtmPageViewOnRouteChange = (
  props: {
    userId?: string | number
  } = {}
) => {
  const { userId } = props

  const router = useRouter()
  const handleRouteChangeComplete = (url) => setPageview(url, { userId })
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])
}

/**
 * For client side purposes
 * Place in <Head /> component in _document.tsx
 */
export const renderGtmScriptTag = () => {
  if (!GTM_ID) return null
  return (
    <script defer
      id="gtag-base"
      dangerouslySetInnerHTML={{
        __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
      }}
    />
  )
}

/**
 * For SSR purposes
 * Place as sibling between <Head /> and <body> tags in _document.tsx and
 * wrap it within a <noscript> tag
 *
 * @example <noscript>{renderGtmNoScriptTag()}</noscript>
 */
export const renderGtmNoScriptTag = () => {
  if (!GTM_ID) return null
  return (
    <iframe
      title="Google Tag Manager"
      src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
  )
}
