import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import CountryField, { CountryFieldProps } from './CountryField'

export type ControlledCountryFieldProps = UseControllerProps & CountryFieldProps

const ControlledCountryField: React.FC<ControlledCountryFieldProps> = (
  props
) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <CountryField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledCountryField
