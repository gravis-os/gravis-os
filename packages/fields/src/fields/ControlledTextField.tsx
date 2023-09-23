import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import TextField, { TextFieldProps } from './TextField'

export type ControlledTextFieldProps = UseControllerProps & TextFieldProps

const ControlledTextField: React.FC<ControlledTextFieldProps> = (props) => {
  const { control, ...rest } = props
  const { required } = rest
  return (
    <Controller
      control={control}
      render={({ field }) => <TextField {...field} {...rest} />}
      {...(typeof required === 'boolean' && { rules: { required } })}
      {...rest}
    />
  )
}

export default ControlledTextField
