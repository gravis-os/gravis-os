import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React from 'react'

import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import merge from 'lodash/merge'

export type ResponsiveMaxWidth = ResponsiveStyleValue<
  MuiContainerProps['maxWidth']
>

export const getResponsiveMaxWidth =
  (maxWidth: ResponsiveMaxWidth) =>
  ({ breakpoints }) => {
    return Object.entries(maxWidth).reduce((acc, [key, value]) => {
      if (typeof value !== 'string') return acc
      const nextValue = breakpoints.values[value]
      return { ...acc, [key]: nextValue }
    }, {}) as ResponsiveStyleValue<number | string>
  }

export interface ContainerProps extends Omit<MuiContainerProps, 'maxWidth'> {
  disableContainer?: boolean
  disableContainerOnMobile?: boolean
  disableGuttersOnMobile?: boolean
  maxWidth?: MuiContainerProps['maxWidth'] | ResponsiveMaxWidth
}

const Container: React.FC<ContainerProps> = (props) => {
  const {
    disableContainer: injectedDisableContainer,
    disableContainerOnMobile,
    disableGuttersOnMobile,
    maxWidth,
    sx,
    ...rest
  } = props
  const { children } = rest

  const theme = useTheme()
  const isResponsiveMaxWidth = typeof maxWidth === 'object'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const disableContainer =
    injectedDisableContainer ?? (isMobile && disableContainerOnMobile)

  if (disableContainer) return <>{children}</>

  return (
    <MuiContainer
      {...(!isResponsiveMaxWidth && { maxWidth })}
      sx={merge({}, sx, {
        ...(isResponsiveMaxWidth && {
          maxWidth: getResponsiveMaxWidth(maxWidth),
        }),

        ...(disableGuttersOnMobile && {
          [theme.breakpoints.down('md')]: {
            '&&': { px: 0 },
          },
        }),
      })}
      {...rest}
    />
  )
}

export default Container
