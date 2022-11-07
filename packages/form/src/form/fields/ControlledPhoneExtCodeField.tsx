import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import PhoneExtCodeField, { PhoneExtCodeFieldProps } from './PhoneExtCodeField'

export type ControlledPhoneExtCodeFieldProps = UseControllerProps &
  PhoneExtCodeFieldProps

const ControlledPhoneExtCodeField: React.FC<
  ControlledPhoneExtCodeFieldProps
> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <PhoneExtCodeField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledPhoneExtCodeField
