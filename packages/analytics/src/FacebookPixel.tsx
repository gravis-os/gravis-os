/**
 * Add Facebook Pixel adapted from NextJS 12 with-facebook-pixel example
 * https://github.com/vercel/next.js/tree/canary/examples/with-facebook-pixel/_pages
 */
import React, { useEffect } from 'react'

import { useRouter } from 'next/router'
import Script from 'next/script'

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  ;(window as any).fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  ;(window as any).fbq('track', name, options)
}

export const facebookPixel = { event, FB_PIXEL_ID, pageview }

/**
 * For SSR purposes
 * Place as sibling between <Head /> and <body> tags in _document.tsx and
 * wrap it within a <noscript> tag
 *
 * @example <noscript>{renderFacebookPixelNoScriptTag()}</noscript>
 */
export const renderFacebookPixelNoScriptTag = () => {
  if (!FB_PIXEL_ID) return null
  return (
    <img
      height="1"
      src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
      style={{ display: 'none' }}
      width="1"
    />
  )
}

export const FacebookPixel = () => {
  const router = useRouter()

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    if (!FB_PIXEL_ID) {
      facebookPixel.pageview()
      const handleRouteChange = () => {
        facebookPixel.pageview()
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  if (!FB_PIXEL_ID) return null

  return (
    <>
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FB_PIXEL_ID});
          `,
        }}
        id="fb-pixel"
        strategy="afterInteractive"
      />
    </>
  )
}

export default FacebookPixel
