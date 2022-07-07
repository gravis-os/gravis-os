import React from 'react'
import { Box, Stack, StackProps, Header, HeaderProps } from '@gravis-os/ui'
import Footer, { FooterProps } from '../Footer'

export interface LandingLayoutProps extends StackProps {
  headerProps?: HeaderProps
  footerProps?: FooterProps
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const { headerProps, footerProps, children, sx, ...rest } = props
  return (
    <Stack sx={{ minHeight: '100vh', ...sx }} {...rest}>
      <Header {...headerProps} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer {...footerProps} />
    </Stack>
  )
}

export default LandingLayout
