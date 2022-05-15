import * as React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  useAuth,
  withAuthProvider,
  withAuthRequired,
  useUser,
} from '@gravis-os/auth'
import { StorageAvatar } from '@gravis-os/storage'
import RouterLink from 'next/link'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

export const getServerSideProps = withAuthRequired()

const Profile: NextPage = (props) => {
  const { logout } = useAuth()
  const router = useRouter()

  const { user } = useUser()

  const handleLogoutClick = async () => {
    await logout()
    router.push('/')
  }

  return (
    <Container maxWidth="lg">
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
          Profile
        </Typography>

        <StorageAvatar src="image-123123.png" alt={user.title} />
        <Typography variant="h3" gutterBottom>
          {user.title}
        </Typography>

        <Button onClick={handleLogoutClick}>Logout</Button>

        <Box maxWidth="sm">
          <Button href="/">Go to the home page</Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default withAuthProvider()(Profile)
