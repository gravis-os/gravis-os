import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { StaticImageData } from 'next/image'
import {
  Box,
  BoxProps,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Image,
  Stack,
  Typography,
} from '@gravis-os/ui'

export interface AuthLayoutProps extends BoxProps {
  actions?: React.ReactElement
  children?: React.ReactElement
  disableResetPasswordButton?: boolean
  authRoutes?: {
    resetPassword?: string
  }
  logo?: React.ReactElement
  logoProps?: BoxProps
  fullScreen?: boolean
  backgroundImgSrc?: string | StaticImageData
  copyright?: string | ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const {
    logo,
    logoProps,
    actions,
    children,
    disableResetPasswordButton,
    authRoutes,
    sx,
    fullScreen,
    backgroundImgSrc,
    copyright,
    ...rest
  } = props

  // JSX
  const actionsJsx = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ width: 'auto' }}
    >
      {!disableResetPasswordButton && (
        <Button href={authRoutes.resetPassword}>Reset Password</Button>
      )}
      {actions}
    </Stack>
  )
  const copyrightJsx = (
    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
      {copyright}
    </Typography>
  )
  const logoJsx = (
    <NextLink href="/" passHref>
      <a>{logo}</a>
    </NextLink>
  )

  if (fullScreen) {
    return (
      <Box component="main" {...rest} sx={sx}>
        <Grid
          container
          spacing={0}
          alignItems="stretch"
          sx={{
            backgroundColor: 'background.paper',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Grid item xs sx={{ height: '100%' }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                px: 5,
                height: '100%',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {logo && <Box {...logoProps}>{logoJsx}</Box>}
              {children}
              {actionsJsx}
              {copyright && (
                <Box
                  width="100%"
                  textAlign="center"
                  position="absolute"
                  bottom={0}
                >
                  {copyrightJsx}
                </Box>
              )}
            </Stack>
          </Grid>
          {Boolean(backgroundImgSrc) && (
            <Grid item xs={false} md={5} sx={{ height: '100%' }}>
              <Image
                src={backgroundImgSrc}
                objectFit="cover"
                containerSx={{
                  height: '100%',
                  pb: 0,
                }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    )
  }

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
        <Card elevation={16} sx={{ p: 4, position: 'relative' }}>
          {logo && (
            <Box
              {...logoProps}
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...logoProps?.sx,
              }}
            >
              {logoJsx}
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

          {actionsJsx}
          {copyright && (
            <Box width="100%" textAlign="center" mt={3}>
              {copyrightJsx}
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  )
}

export default AuthLayout
