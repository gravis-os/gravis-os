import React from 'react'
import { Box, BoxProps, Typography } from '@gravis-os/ui'

export interface AuthBoxProps extends BoxProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const AuthBox: React.FC<AuthBoxProps> = props => {
  const { title, subtitle, children, ...rest } = props
  return (
    <Box {...rest}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Form */}
      {children}
    </Box>
  )
}

export default AuthBox
