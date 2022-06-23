import React from 'react'
import Box from '../Box'
import Stack, { StackProps } from '../Stack'
import Header, { HeaderProps } from '../Header'
import Footer, { FooterProps } from '../Footer'

export interface LandingLayoutProps extends StackProps {
  headerProps: HeaderProps
  footerProps: FooterProps
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
