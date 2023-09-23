import React from 'react'

import { Box, BoxProps, Button, Typography } from '@gravis-os/ui'

import useUser from './useUser'

export interface UnauthorizedBoxProps extends BoxProps {}

const UnauthorizedBox: React.FC<UnauthorizedBoxProps> = (props) => {
  const { authRoutes } = useUser()

  return (
    <Box center {...props}>
      <Typography variant="h3">Unauthorized</Typography>

      <Button href={authRoutes.authenticationFailureRedirect}>
        Back to Login
      </Button>
    </Box>
  )
}

export default UnauthorizedBox
