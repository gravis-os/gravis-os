import React from 'react'

import { printHtml } from '@gravis-os/utils'

import Box, { BoxProps } from './Box'

export interface HtmlProps extends BoxProps {
  html: string
}

const Html: React.FC<HtmlProps> = (props) => {
  const { html, sx, ...rest } = props

  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: printHtml(html),
      }}
      sx={{
        '& blockquote': { borderLeft: 4, ml: 0, opacity: 0.8, pl: 4 },
        '& h1': {
          fontFamily: 'h1.fontFamily',
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          mb: 1,
          mt: 0,
        },
        '& h2': {
          fontFamily: 'h2.fontFamily',
        },
        '& h3': {
          fontFamily: 'h3.fontFamily',
        },
        '& h4': {
          fontFamily: 'h4.fontFamily',
        },
        '& h5': {
          fontFamily: 'h5.fontFamily',
        },
        '& h6': {
          fontFamily: 'h6.fontFamily',
        },
        '& img': {
          maxWidth: '100%',
        },
        '& p': { mb: 0, mt: 0 },
        '& p + p': { mt: 2 },
        fontSize: {
          xs: 'subtitle2.fontSize',
          md: 'subtitle1.fontSize',
        },
        mt: 0,
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Html
