import React from 'react'
import { Box, Stack, StackProps } from '@gravis-os/ui'
// import Header, { HeaderProps } from '../Header'
import Footer, { FooterProps } from '../Footer'

export interface LandingLayoutProps extends StackProps {
  footerProps: FooterProps
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const { footerProps, children, sx, ...rest } = props
  return (
    <Stack sx={{ minHeight: '100vh', ...sx }} {...rest}>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer {...footerProps} />
    </Stack>
  )
}

export default LandingLayout
