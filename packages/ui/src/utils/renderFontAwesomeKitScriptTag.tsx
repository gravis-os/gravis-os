import React from 'react'

const kitName = process.env.NEXT_PUBLIC_FONT_AWESOME_KIT_NAME

const renderFontAwesomeKitScriptTag = () => {
  if (!kitName) return null
  return (
    <script
      src={`https://kit.fontawesome.com/${kitName}.js`}
      crossOrigin="anonymous"
    />
  )
}

export default renderFontAwesomeKitScriptTag
