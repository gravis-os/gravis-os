import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { darken } from '@mui/material/styles'
import Button, { ButtonProps } from '../core/Button'

export interface WhatsappButtonProps extends ButtonProps {
  to: string
  text: string
}

const WhatsappButton: React.FC<WhatsappButtonProps> = (props) => {
  const { to, text } = props

  if (!to && !text) return null

  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      color="secondary"
      startIcon={<WhatsAppIcon />}
      sx={{
        backgroundColor: '#25d366',
        color: 'common.white',
        '&:hover': {
          backgroundColor: darken('#25d366', 0.1),
        },
      }}
      href={`https://wa.me/${to}?text=${encodeURIComponent(text)}`}
      targetBlank
    >
      WhatsApp
    </Button>
  )
}

export default WhatsappButton
