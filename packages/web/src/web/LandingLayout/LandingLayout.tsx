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
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const {
    headerProps,
    footerProps,
    children,
    sx,
    bodyProps,
    backgroundColor,
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
