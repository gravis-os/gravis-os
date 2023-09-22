import React, { ReactNode } from 'react'
import { StaticImageData } from 'next/image'
import {
  Box,
  type BoxProps,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Grid,
  Image,
  type ImageProps,
  Stack,
  Typography,
} from '@gravis-os/ui'

export interface AuthLayoutProps extends BoxProps {
  actions?: React.ReactElement
  children?: React.ReactElement
  disableResetPasswordButton?: boolean
  disableDivider?: boolean
  disableCard?: boolean
  authRoutes?: {
    resetPassword?: string
  }
  logo?: React.ReactElement
  logoProps?: BoxProps
  fullScreen?: boolean
  backgroundImgSrc?: string | StaticImageData
  backgroundImgProps?: Omit<ImageProps, 'src'>
  copyright?: string | ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const {
    logo,
    logoProps,
    actions,
    children,
    disableResetPasswordButton,
    disableDivider,
    disableCard,
    authRoutes,
    sx,
    fullScreen,
    backgroundImgSrc,
    backgroundImgProps = {},
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
  const logoJsx = <Link href="/">{logo}</Link>

  if (fullScreen) {
    return (
      <Box component="main" {...rest} sx={sx}>
        <Grid container spacing={0} sx={{ width: '100vw', height: '100vh' }}>
          {/* Left Children */}
          <Grid item xs sx={{ height: '100%' }}>
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

          {/* Right Background */}
          {Boolean(backgroundImgSrc) && (
            <Grid item xs={false} md={5} sx={{ height: '100%' }}>
              <Image
                src={backgroundImgSrc}
                boxSx={{ height: '100%', pb: 0 }}
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
        <Box width="100%" textAlign="center" mt={3}>
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
