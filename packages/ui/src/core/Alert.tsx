import React from 'react'

import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material'

const getAlertVariant = (variant) => {
  switch (variant) {
    case 'contained': {
      return 'filled'
    }
    default: {
      return variant
    }
  }
}

export interface AlertProps extends Omit<MuiAlertProps, 'variant'> {
  square?: boolean
  variant?: 'contained' | MuiAlertProps['variant']
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    color,
    severity: injectedSeverity,
    square,
    sx,
    variant: injectedVariant = 'filled',
    ...rest
  } = props

  const severity = injectedSeverity || color
  const variant = getAlertVariant(injectedVariant)
  const alertProps = {
    severity,
    sx: {
      ...(square && { borderRadius: 0 }),
      ...sx,
    },
    variant,
  }

  return <MuiAlert {...alertProps} {...rest} />
}

export default Alert
