import React from 'react'

import { Box, BoxProps } from '@gravis-os/ui'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'

export interface SupabaseUIAuthFormProps extends BoxProps {
  formProps?: Record<string, unknown>
}

const SupabaseUIAuthForm: React.FC<SupabaseUIAuthFormProps> = (props) => {
  const { formProps, sx, ...rest } = props

  return (
    <Box
      sx={{
        // Links
        '& .sbui-typography-link': {
          '&:hover': {
            color: 'primary.dark',
          },
          color: 'primary.main',
        },
        // Buttons
        '& button': {
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          backgroundColor: 'primary.main',
        },
        width: '100%',
        ...sx,
      }}
      {...rest}
    >
      <UserProvider supabaseClient={supabaseClient} {...formProps} />
    </Box>
  )
}

export default SupabaseUIAuthForm
