import React from 'react'
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material'

const getAlertVariant = variant => {
  switch (variant) {
    case 'contained':
      return 'filled'
    default:
      return variant
  }
}

export interface AlertProps extends Omit<MuiAlertProps, 'variant'> {
  variant?: 'contained' | MuiAlertProps['variant']
}

const Alert: React.FC<AlertProps> = props => {
  const {
    variant: injectedVariant = 'filled',
    severity: injectedSeverity,
    color,
    ...rest
  } = props

  const severity = injectedSeverity || color
  const variant = getAlertVariant(injectedVariant)
  const alertProps = {
    severity,
    variant,
  }

  return (
    <>
      <MuiAlert {...alertProps} {...rest} />
    </>
  )
}

export default Alert
