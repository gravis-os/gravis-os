import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Container, Typography, Box, Button } from '@gravis-os/ui'
import { AuthForm, useUser, withAuthProvider } from '@gravis-os/auth'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

const Auth: NextPage = () => {
  const { user, authUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && authUser) router.push('/profile')
  }, [user, authUser, router])

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Auth
        </Typography>

        <AuthForm />

        <Box maxWidth="sm" sx={{ mt: 6 }}>
          <Button href="/">Go to the home page</Button>
        </Box>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default withAuthProvider({
  guestPaths: ['/', '/about', '/contact', '/auth/*'],
})(Auth)
