import React from 'react'
import { Control, Controller } from 'react-hook-form'

import { Stack, Switch, Typography } from '@gravis-os/ui'
import startCase from 'lodash/startCase'

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
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      spacing={1}
    >
      {/* Left */}
      <div>
        <Typography lineHeight={1.4} variant="subtitle1">
          {label || startCase(name.startsWith('is_') ? name.slice(3) : name)}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" lineHeight={1} variant="body2">
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
