import React from 'react'
import { printHtml } from '@gravis-os/utils'
import Box, { BoxProps } from './Box'

export interface HtmlProps extends BoxProps {
  html: string
}

const Html: React.FC<HtmlProps> = (props) => {
  const { html, ...rest } = props

  return (
    <Box
      sx={{
        '& p': { mt: 0, mb: 0 },
      }}
      dangerouslySetInnerHTML={{
        __html: printHtml(html),
      }}
      {...rest}
    />
  )
}

export default Html
