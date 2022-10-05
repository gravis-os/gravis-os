import React from 'react'
import Svg from 'react-inlinesvg'
import Stack, { StackProps } from './Stack'
import Typography, { TypographyProps } from './Typography'
import Link, { LinkProps } from './Link'

export interface LogoProps extends LinkProps {
  title?: string
  emblem?: React.ReactNode
  wordmark?: React.ReactNode
  titleProps?: TypographyProps
  spacing?: StackProps['spacing']
  width?: number | string
  height?: number | string
  sx?: LinkProps['sx']
  svgSx?: LinkProps['sx']
  svgSrc?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const {
    wordmark,
    emblem,
    title,
    spacing = 1.5,
    width,
    height = 20,
    titleProps,
    sx,
    svgSx,
    svgSrc,
    ...rest
  } = props

  return (
    <Link
      href="/"
      fadeOnHover
      underline="none"
      sx={
        {
          display: 'flex',
          '& svg': {
            width,
            height,
            fill: ({ palette }) => palette.text.primary,
            ...svgSx,
          },
          ...sx,
        } as LinkProps['sx']
      }
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={spacing}>
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
