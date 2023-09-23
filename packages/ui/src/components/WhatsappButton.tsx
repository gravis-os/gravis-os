import React from 'react'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { darken } from '@mui/material/styles'

import Button, { ButtonProps } from '../core/Button'

export interface WhatsappButtonProps extends ButtonProps {
  text: string
  to: string
}

const WhatsappButton: React.FC<WhatsappButtonProps> = (props) => {
  const { text, to } = props

  if (!to && !text) return null

  return (
    <Button
      color="secondary"
      fullWidth
      href={`https://wa.me/${to}?text=${encodeURIComponent(text)}`}
      size="large"
      startIcon={<WhatsAppIcon />}
      sx={{
        '&:hover': {
          backgroundColor: darken('#25d366', 0.1),
        },
        backgroundColor: '#25d366',
        color: 'common.white',
      }}
      targetBlank
      variant="contained"
    >
      WhatsApp
    </Button>
  )
}

export default WhatsappButton
