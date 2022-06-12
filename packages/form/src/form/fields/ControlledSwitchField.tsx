import React from 'react'
import { Control, Controller } from 'react-hook-form'
import startCase from 'lodash/startCase'
import { Stack, Typography, Switch } from '@gravis-os/ui'

export interface ControlledSwitchFieldProps {
  control: Control
  name: string
  subtitle?: string
}

const SwitchField = (props) => {
  const { label, subtitle, ...rest } = props
  const { name, value } = rest

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      {/* Left */}
      <div>
        <Typography variant="subtitle1" lineHeight={1.4}>
          {label || startCase(name.startsWith('is_') ? name.slice(3) : name)}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" lineHeight={1}>
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Right */}
      <Switch checked={Boolean(value)} {...rest} />
    </Stack>
  )
}

const ControlledSwitchField: React.FC<ControlledSwitchFieldProps> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <SwitchField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledSwitchField
