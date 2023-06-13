import React from 'react'
import { Box, Typography, ButtonProps } from '@gravis-os/ui'
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined'
import { withPaletteMode } from '@gravis-os/theme'
import { useTheme } from '@mui/material'
import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderGhostButtonBlockItemProps
  extends Omit<ButtonProps, 'size'> {
  overline?: React.ReactNode
  title?: ButtonProps['title']
  boxProps?: BlockItemProps['boxProps']
  size?: 'sm' | 'md' | 'lg' | ButtonProps['size']
  isCta?: boolean
  children?: JSX.Element
}

const renderGhostButtonBlockItem = (
  props: RenderGhostButtonBlockItemProps
): BlockItemProps => {
  const {
    isCta,
    overline,
    title,
    boxProps,
    sx,
    size = 'md',
    children = <></>,
    ...rest
  } = props
  const isLarge = size === 'lg'

  const theme = useTheme()
  const dialogChildrenJsx = withPaletteMode({ mode: theme.palette.mode })(
    children
  )

  return {
    type: 'button',
    title: (
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="overline2"
          lineHeight={1.75}
          color="text.secondary"
        >
          {overline}
        </Typography>
        <Typography variant="button2">{title}</Typography>
      </Box>
    ),
    titleProps: {
      variant: 'ghost',
      size: 'large',
      fullWidthOnMobile: isLarge,
      disableBorderRadius: true,
      disableRipple: true,
      endIcon: <TrendingFlatOutlinedIcon sx={{ color: 'text.secondary' }} />,
      sx: {
        textAlign: 'left',
        padding: {
          xs: isLarge ? '1.125em 1.75em' : '0.95em 2em',
          sm: isLarge ? '1.5em 2.5em' : '1.125em 2.5em',
        },
        minWidth: {
          xs: isLarge ? '22em' : '20em',
          sm: isLarge ? '25em' : '27em',
        },
        ...sx,
      },
      ...(isCta && {
        dialogProps: {
          fullScreen: true,
          disableTitle: true,
          transitionVariant: 'fade' as const,
          children: dialogChildrenJsx,
        },
      }),
      ...rest,
    },
    boxProps,
  }
}

export default renderGhostButtonBlockItem
