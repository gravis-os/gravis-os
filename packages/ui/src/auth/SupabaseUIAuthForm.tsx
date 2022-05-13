import React from 'react'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import Box, { BoxProps } from '../ui/Box'

export interface SupabaseUIAuthFormProps extends BoxProps {
  formProps?: Record<string, unknown>
}

const SupabaseUIAuthForm: React.FC<SupabaseUIAuthFormProps> = props => {
  const { formProps, sx, ...rest } = props

  return (
    <Box
      sx={{
        width: '100%',
        // Buttons
        '& button': {
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        },
        // Links
        '& .sbui-typography-link': {
          color: 'primary.main',
          '&:hover': {
            color: 'primary.dark',
          },
        },
        ...sx,
      }}
      {...rest}
    >
      <UserProvider supabaseClient={supabaseClient} {...formProps} />
    </Box>
  )
}

export default SupabaseUIAuthForm
