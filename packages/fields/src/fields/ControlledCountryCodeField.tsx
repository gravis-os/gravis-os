import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import CountryCodeField, { CountryCodeFieldProps } from './CountryCodeField'

export type ControlledCountryCodeFieldProps = UseControllerProps &
  CountryCodeFieldProps

const ControlledCountryCodeField: React.FC<ControlledCountryCodeFieldProps> = (
  props
) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <CountryCodeField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledCountryCodeField
