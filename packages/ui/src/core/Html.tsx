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
      sx={{
        '& p': { mt: 0, mb: 0 },
        '& p + p': { mt: 2 },
        '& img': {
          maxWidth: '100%',
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          mt: 0,
          mb: 1,
        },
        '& h1': {
          fontFamily: 'h1.fontFamily',
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
        '& blockquote': { borderLeft: 4, pl: 4, ml: 0, opacity: 0.8 },
        fontSize: {
          xs: 'subtitle2.fontSize',
          md: 'subtitle1.fontSize',
        },
        mt: 0,
        ...sx,
      }}
      dangerouslySetInnerHTML={{
        __html: printHtml(html),
      }}
      {...rest}
    />
  )
}

export default Html
