import React, { ReactNode } from 'react'

import {
  Box,
  type BoxProps,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Image,
  type ImageProps,
  Link,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { StaticImageData } from 'next/image'

export interface AuthLayoutProps extends BoxProps {
  actions?: React.ReactElement
  authRoutes?: {
    resetPassword?: string
  }
  backgroundImgProps?: Omit<ImageProps, 'src'>
  backgroundImgSrc?: StaticImageData | string
  children?: React.ReactElement
  copyright?: ReactNode | string
  disableCard?: boolean
  disableDivider?: boolean
  disableResetPasswordButton?: boolean
  fullScreen?: boolean
  logo?: React.ReactElement
  logoProps?: BoxProps
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const {
    actions,
    authRoutes,
    backgroundImgProps = {},
    backgroundImgSrc,
    children,
    copyright,
    disableCard,
    disableDivider,
    disableResetPasswordButton,
    fullScreen,
    logo,
    logoProps,
    sx,
    ...rest
  } = props

  // JSX
  const actionsJsx = (
    <Stack
      alignItems="center"
      direction="row"
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
    <Typography sx={{ color: 'text.disabled' }} variant="caption">
      {copyright}
    </Typography>
  )
  const logoJsx = <Link href="/">{logo}</Link>

  if (fullScreen) {
    return (
      <Box component="main" {...rest} sx={sx}>
        <Grid container spacing={0} sx={{ height: '100vh', width: '100vw' }}>
          {/* Left Children */}
          <Grid item sx={{ height: '100%' }} xs>
            <Stack
              justifyContent="center"
              sx={{ height: '100%', position: 'relative' }}
            >
              {logo && (
                <Box {...logoProps} sx={{ mb: 2, ...logoProps?.sx }}>
                  {logoJsx}
                </Box>
              )}
              {children}
              {actionsJsx}
              {copyright && (
                <Box
                  bottom={0}
                  position="absolute"
                  textAlign="center"
                  width="100%"
                >
                  {copyrightJsx}
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Right Background */}
          {Boolean(backgroundImgSrc) && (
            <Grid item md={5} sx={{ height: '100%' }} xs={false}>
              <Image
                boxSx={{ height: '100%', pb: 0 }}
                src={backgroundImgSrc}
                {...backgroundImgProps}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    )
  }

  const contentJsx = (
    <>
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
      {!disableDivider && <Divider sx={{ my: 3 }} />}

      {actionsJsx}
      {copyright && (
        <Box mt={3} textAlign="center" width="100%">
          {copyrightJsx}
        </Box>
      )}
    </>
  )

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
        {disableCard ? (
          contentJsx
        ) : (
          <Card elevation={16} sx={{ p: 4, position: 'relative' }}>
            {contentJsx}
          </Card>
        )}
      </Container>
    </Box>
  )
}

export default AuthLayout
