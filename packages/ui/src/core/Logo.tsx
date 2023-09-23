import React from 'react'
import Svg from 'react-inlinesvg'

import Link, { LinkProps } from './Link'
import Stack, { StackProps } from './Stack'
import Typography, { TypographyProps } from './Typography'

export interface LogoProps extends LinkProps {
  emblem?: React.ReactNode
  height?: number | string
  spacing?: StackProps['spacing']
  svgSrc?: string
  svgSx?: LinkProps['sx']
  sx?: LinkProps['sx']
  title?: string
  titleProps?: TypographyProps
  width?: number | string
  wordmark?: React.ReactNode
}

const Logo: React.FC<LogoProps> = (props) => {
  const {
    title,
    emblem,
    height = 20,
    spacing = 1.5,
    svgSrc,
    svgSx,
    sx,
    titleProps,
    width,
    wordmark,
    ...rest
  } = props

  return (
    <Link
      fadeOnHover
      href="/"
      sx={
        {
          '& svg': {
            fill: ({ palette }) => palette.text.primary,
            height,
            width,
            ...svgSx,
          },
          display: 'flex',
          ...sx,
        } as LinkProps['sx']
      }
      underline="none"
      {...rest}
    >
      <Stack alignItems="center" direction="row" spacing={spacing}>
        {emblem}
        {svgSrc && <Svg src={svgSrc} />}
        {wordmark}
        {title && (
          <Typography
            variant="overline"
            {...titleProps}
            sx={
              {
                '&&': {
                  lineHeight: 1,
                  ...titleProps?.sx,
                },
              } as TypographyProps['sx']
            }
          >
            {title}
          </Typography>
        )}
      </Stack>
    </Link>
  )
}

export default Logo
