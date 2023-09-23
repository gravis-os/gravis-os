import React from 'react'

const kitName = process.env.NEXT_PUBLIC_FONT_AWESOME_KIT_NAME

const renderFontAwesomeKitPreconnectLinkTags = () => {
  if (!kitName) return null
  return (
    <>
      <link href="https://ka-p.fontawesome.com" rel="preconnect" />
      <link href="https://use.fontawesome.com" rel="preconnect" />
      <link href="https://kit.fontawesome.com" rel="preconnect" />
    </>
  )
}

export default renderFontAwesomeKitPreconnectLinkTags
