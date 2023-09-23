import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import PercentageField, { PercentageFieldProps } from './PercentageField'

export type ControlledPercentageFieldProps = UseControllerProps &
  Partial<PercentageFieldProps>

const ControlledPercentageField: React.FC<ControlledPercentageFieldProps> = (
  props
) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <PercentageField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledPercentageField
