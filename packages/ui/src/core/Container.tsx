import React from 'react'
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

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
  disableGuttersOnMobile?: boolean
  maxWidth?: MuiContainerProps['maxWidth'] | ResponsiveMaxWidth
}

const Container: React.FC<ContainerProps> = (props) => {
  const { maxWidth, disableGuttersOnMobile, sx, ...rest } = props

  const theme = useTheme()
  const isResponsiveMaxWidth = typeof maxWidth === 'object'

  return (
    <MuiContainer
      {...(!isResponsiveMaxWidth && { maxWidth })}
      sx={{
        ...(isResponsiveMaxWidth && {
          maxWidth: getResponsiveMaxWidth(maxWidth),
        }),

        ...(disableGuttersOnMobile && {
          [theme.breakpoints.down('md')]: {
            '&&': { px: 0 },
          },
        }),
      }}
      {...rest}
    />
  )
}

export default Container
