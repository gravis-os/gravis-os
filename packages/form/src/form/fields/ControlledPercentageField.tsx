import React from 'react'
import { Control, Controller } from 'react-hook-form'
import PercentageField from './PercentageField'

export interface ControlledPercentageFieldProps {
  control: Control
  name: string
}

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
