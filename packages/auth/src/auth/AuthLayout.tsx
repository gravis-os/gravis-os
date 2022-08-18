import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  BoxProps,
  Button,
  Card,
  Container,
  Divider,
  Stack,
} from '@gravis-os/ui'

export interface AuthLayoutProps extends BoxProps {
  actions?: React.ReactElement
  children?: React.ReactElement
  disableResetPasswordButton?: boolean
  title: string
  authRoutes?: {
    resetPassword?: string
  }
  logo?: React.ReactElement
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const {
    logo,
    actions,
    children,
    disableResetPasswordButton,
    title,
    authRoutes,
    sx,
    ...rest
  } = props

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.dark',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...sx,
      }}
      {...rest}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: '60px',
            md: '120px',
          },
        }}
      >
        <Card elevation={16} sx={{ p: 4 }}>
          {logo && (
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <NextLink href="/" passHref>
                <a>{logo}</a>
              </NextLink>
            </Box>
          )}
          <Box
            sx={{
              flexGrow: 1,
              mt: 3,
            }}
          >
            {children}
          </Box>
          <Divider sx={{ my: 3 }} />

          <Stack direction="row" alignItems="center" spacing={1}>
            {!disableResetPasswordButton && (
              <Button href={authRoutes.resetPassword}>Reset Password</Button>
            )}
            {actions}
          </Stack>
        </Card>
      </Container>
    </Box>
  )
}

export default AuthLayout
