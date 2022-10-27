import React from 'react'
import { Box, BoxProps, Typography, TypographyProps } from '@gravis-os/ui'

export interface AuthBoxProps extends BoxProps {
  title: string
  titleProps?: TypographyProps
  subtitle?: string
  subtitleProps?: TypographyProps
  children: React.ReactNode
}

const AuthBox: React.FC<AuthBoxProps> = (props) => {
  const { title, subtitle, children, titleProps, subtitleProps, ...rest } =
    props
  return (
    <Box {...rest}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom {...titleProps}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" {...subtitleProps}>
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
