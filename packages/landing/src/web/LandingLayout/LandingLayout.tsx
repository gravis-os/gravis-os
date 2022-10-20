import React from 'react'
import {
  Box,
  Stack,
  StackProps,
  Header,
  HeaderProps,
  BoxProps,
} from '@gravis-os/ui'
import Footer, { FooterProps } from '../Footer'

export interface LandingLayoutProps extends StackProps {
  headerProps?: HeaderProps
  footerProps?: FooterProps
  bodyProps?: BoxProps
  backgroundColor?: string

  // Gutters (vertical)
  disableGutters?: boolean
  disableGutterTop?: boolean
  disableGutterBottom?: boolean
  gutterSize?: number
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const {
    headerProps,
    footerProps,
    children,
    sx,
    bodyProps,
    backgroundColor,
    disableGutters,
    disableGutterTop,
    disableGutterBottom,
    gutterSize = 4,
    ...rest
  } = props

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor, ...sx }} {...rest}>
      {headerProps && <Header {...headerProps} />}
      <Box
        {...bodyProps}
        sx={{
          flexGrow: 1,
          ...(backgroundColor && {
            '&, & > .MuiBox-root': {
              backgroundColor,
            },
          }),

          // Gutters
          ...(!(disableGutterTop || disableGutters) && { pt: gutterSize }),
          ...(!(disableGutterBottom || disableGutters) && { pb: gutterSize }),

          ...bodyProps?.sx,
        }}
      >
        {children}
      </Box>
      {footerProps && <Footer {...footerProps} />}
    </Stack>
  )
}

export default LandingLayout
