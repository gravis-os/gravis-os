import React from 'react'

const kitName = process.env.NEXT_PUBLIC_FONT_AWESOME_KIT_NAME

const renderFontAwesomeKitScriptTag = () => {
  if (!kitName) return null
  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://kit.fontawesome.com/${kitName}.js`}
    />
  )
}

export default renderFontAwesomeKitScriptTag
