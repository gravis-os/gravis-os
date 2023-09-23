import React from 'react'

import { withPaletteMode } from '@gravis-os/theme'
import { Box, ButtonProps, Typography } from '@gravis-os/ui'
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined'
import { useTheme } from '@mui/material'

import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderGhostButtonBlockItemProps
  extends Omit<ButtonProps, 'size'> {
  boxProps?: BlockItemProps['boxProps']
  children?: JSX.Element
  isCta?: boolean
  overline?: React.ReactNode
  size?: 'lg' | 'md' | 'sm' | ButtonProps['size']
  title?: ButtonProps['title']
}

const renderGhostButtonBlockItem = (
  props: RenderGhostButtonBlockItemProps
): BlockItemProps => {
  const {
    title,
    boxProps,
    children = <></>,
    isCta,
    overline,
    size = 'md',
    sx,
    ...rest
  } = props
  const isLarge = size === 'lg'

  const theme = useTheme()
  const dialogChildrenJsx = withPaletteMode({ mode: theme.palette.mode })(
    children
  )

  return {
    title: (
      <Box sx={{ width: '100%' }}>
        <Typography
          color="text.secondary"
          lineHeight={1.75}
          variant="overline2"
        >
          {overline}
        </Typography>
        <Typography variant="button2">{title}</Typography>
      </Box>
    ),
    boxProps,
    titleProps: {
      disableBorderRadius: true,
      disableRipple: true,
      endIcon: <TrendingFlatOutlinedIcon sx={{ color: 'text.secondary' }} />,
      fullWidthOnMobile: isLarge,
      size: 'large',
      sx: {
        minWidth: {
          xs: isLarge ? '22em' : '20em',
          sm: isLarge ? '25em' : '27em',
        },
        padding: {
          xs: isLarge ? '1.125em 1.75em' : '0.95em 2em',
          sm: isLarge ? '1.5em 2.5em' : '1.125em 2.5em',
        },
        textAlign: 'left',
        ...sx,
      },
      variant: 'ghost',
      ...(isCta && {
        dialogProps: {
          children: dialogChildrenJsx,
          disableTitle: true,
          fullScreen: true,
          transitionVariant: 'fade' as const,
        },
      }),
      ...rest,
    },
    type: 'button',
  }
}

export default renderGhostButtonBlockItem
