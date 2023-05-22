import React from 'react'
import Script from 'next/script'

const kitName = process.env.NEXT_PUBLIC_FONT_AWESOME_KIT_NAME

const renderFontAwesomeKitScriptTag = () => {
  if (!kitName) return null
  return (
    <Script
      src={`https://kit.fontawesome.com/${kitName}.js`}
      crossOrigin="anonymous"
    />
  )
}

export default renderFontAwesomeKitScriptTag
