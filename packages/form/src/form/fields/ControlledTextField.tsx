import React from 'react'
import { Control, Controller } from 'react-hook-form'
import TextField from './TextField'

export interface ControlledTextFieldProps {
  control: Control
  name: string
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = (props) => {
  const { control, ...rest } = props
  return (
    <Controller
      control={control}
      render={({ field }) => <TextField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledTextField
