import React from 'react'

const kitName = process.env.NEXT_PUBLIC_FONT_AWESOME_KIT_NAME

const renderFontAwesomeKitPreconnectLinkTags = () => {
  if (!kitName) return null
  return (
    <>
      <link rel="preconnect" href="https://ka-p.fontawesome.com" />
      <link rel="preconnect" href="https://use.fontawesome.com" />
      <link rel="preconnect" href="https://kit.fontawesome.com" />
    </>
  )
}

export default renderFontAwesomeKitPreconnectLinkTags
